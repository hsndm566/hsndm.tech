/**
 * Design reminder — Operational Clarity, Arabic edition: the localized path uses native RTL
 * composition, concise Arabic service copy, and the same high-contrast campaign journey.
 */
import { ArrowLeft, ArrowUpRight, Check, MessageCircle, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const WHATSAPP_URL = "https://wa.me/966571448656?text=مرحباً%20AutoApply%20SA،%20أرغب%20في%20بدء%20حملة%20تقديم.";

export default function ArabicHome() {
  return (
    <main className="arabic-page" lang="ar" dir="rtl">
      <header className="arabic-header page-frame">
        <Link className="brand journey-brand" href="/ar" aria-label="الصفحة الرئيسية AutoApply SA">
          <img src="/manus-storage/autoapply-symbol_80d77010.png" alt="" className="brand-mark" />
          <span>AutoApply <em>SA</em></span>
        </Link>
        <Link href="/" className="arabic-language-link">English <ArrowLeft size={15} /></Link>
      </header>
      <section className="arabic-hero page-frame">
        <div className="arabic-kicker"><i /> محرّك التقديم الوظيفي / المملكة العربية السعودية</div>
        <h1>وظائفك القادمة،<br /><i>بخطواتٍ أوضح</i><br />ومنظّمة.</h1>
        <p>AutoApply SA يساعد الباحثين عن عمل داخل المملكة العربية السعودية على تنظيم طلباتهم، تحديد الأدوار المناسبة، والاستمرار في التقديم عبر البريد والبوابات الوظيفية.</p>
        <div className="arabic-actions"><Link href="/enquire" className="button button-paper">ابدأ حملتك <ArrowUpRight size={18} /></Link><a href={WHATSAPP_URL} className="text-button light-text" target="_blank" rel="noreferrer">تحدث معنا عبر واتساب <MessageCircle size={17} /></a></div>
        <div className="arabic-stat-row"><span><b>24/7</b> تنظيم مستمر</span><span><b>EN / AR</b> لغتان مدعومتان</span><span><b>SA</b> خدمة داخل السعودية</span></div>
      </section>
      <section className="arabic-process section-paper">
        <div className="page-frame">
          <div className="arabic-kicker dark-kicker"><i /> كيف تبدأ</div>
          <h2>ثلاث خطوات نحو <i>حملة تقديم مدروسة.</i></h2>
          <div className="arabic-process-grid">
            <article><span>01</span><h3>ارفع سيرتك الذاتية</h3><p>PDF أو DOCX أو TXT. تتم قراءة النص محلياً داخل المتصفح لتحديد إشارات الخبرة والمهارات.</p></article>
            <article><span>02</span><h3>حدّد تفضيلاتك</h3><p>اختر المدينة، المجال، والمستوى الوظيفي لتصبح نتائج المطابقة أكثر قرباً من هدفك داخل السعودية.</p></article>
            <article><span>03</span><h3>ابدأ الحملة</h3><p>تواصل مع الفريق لتأكيد الأدوار المستهدفة، تفاصيل الدفع، وخطوات المتابعة المناسبة لك.</p></article>
          </div>
          <div className="arabic-assurance"><ShieldCheck size={18} /><span><b>خصوصيتك أولاً.</b> لا تُرسل ملفات السيرة الذاتية من نسخة المطابقة المحلية. إذا تعذر قراءة الملف، نطلب منك إرساله مباشرة للفريق عبر واتساب.</span></div>
        </div>
      </section>
      <section className="arabic-final page-frame"><div><span>من جدة، لخدمة الباحثين عن عمل في السعودية.</span><h2>خلّ خطوتك القادمة<br /><i>أكثر وضوحاً.</i></h2></div><Link href="/enquire" className="button button-accent">ابدأ الآن <ArrowUpRight size={18} /></Link></section>
      <footer className="arabic-footer page-frame"><span>AutoApply SA · جدة، المملكة العربية السعودية</span><span><Check size={14} /> دعم باللغتين العربية والإنجليزية</span></footer>
    </main>
  );
}
