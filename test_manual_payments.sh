#!/usr/bin/env bash
set -euo pipefail
BASE="http://127.0.0.1:4176"
RESULT='{"english":{"headline":"Test CV","summary":"Summary","experience":["Experience"],"education":["Education"],"skills":["Skill"],"certifications":[],"languages":["English"]},"arabic":{"headline":"سيرة اختبار","summary":"ملخص","experience":["خبرة"],"education":["تعليم"],"skills":["مهارة"],"certifications":[],"languages":["العربية"]},"atsNotes":[]}'
health=$(curl -fsS "$BASE/api/health")
printf '%s' "$health" | node -e 'let s=""; process.stdin.on("data",d=>s+=d).on("end",()=>{const v=JSON.parse(s); if (!v.manualPayments.ready || !v.manualPayments.bankConfigured || !v.manualPayments.storagePathConfigured || !v.manualPayments.adminConfigured) process.exit(1); console.log("HEALTH_READY=PASS")})'
order_json=$(curl -fsS -X POST "$BASE/api/orders" -H 'Content-Type: application/json' --data "{\"customerName\":\"Test Customer\",\"customerEmail\":\"test@example.com\",\"result\":$RESULT}")
order_id=$(printf '%s' "$order_json" | node -e 'let s=""; process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.parse(s).order.id))')
printf 'ORDER=%s\n' "$order_id"
status_before=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE/api/orders/$order_id/export?language=english")
printf 'LOCKED_EXPORT_STATUS=%s\n' "$status_before"
blocked_approval=$(curl -sS -o /dev/null -w '%{http_code}' -X POST "$BASE/api/admin/orders/$order_id/approve" -H 'x-admin-token: test-admin')
printf 'PRE_TRANSFER_APPROVAL_STATUS=%s\n' "$blocked_approval"
unauthorized=$(curl -sS -o /dev/null -w '%{http_code}' -X POST "$BASE/api/admin/orders/$order_id/approve" -H 'x-admin-token: wrong')
printf 'UNAUTHORIZED_APPROVAL_STATUS=%s\n' "$unauthorized"
curl -fsS -X POST "$BASE/api/orders/$order_id/transfer" -H 'Content-Type: application/json' --data '{"payerName":"Test Customer","transferReference":"CV-TEST-TRANSFER"}' >/dev/null
curl -fsS -X POST "$BASE/api/admin/orders/$order_id/approve" -H 'x-admin-token: test-admin' >/dev/null
export_status=$(curl -sS -o /tmp/test-export.html -w '%{http_code}' "$BASE/api/orders/$order_id/export?language=english")
printf 'APPROVED_EXPORT_STATUS=%s\n' "$export_status"
grep -q 'Test CV' /tmp/test-export.html
printf 'EXPORT_CONTENT=PASS\n'
