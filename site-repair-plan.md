# AutoApply SA site repair

This branch repairs the public AutoApply SA experience by:
- restoring clear AutoApply SA branding
- removing unfinished/placeholder messaging from customer-facing pages
- separating unrelated web-services messaging from the job-seeker product funnel
- tightening the campaign onboarding language
- preserving and reusing existing visual assets rather than inventing new unsupported claims

Visual investigation notes:
- current deployed build still references `/manus-storage/autoapply-symbol_80d77010.png`
- current metadata still references `/manus-storage/autoapply-hero-operations_ad007abc.jpg`
- the repository contains multiple routed pages and hashed visual bundles, so missing visuals are more likely due to references/build changes than total asset deletion
