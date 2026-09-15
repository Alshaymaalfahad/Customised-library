// بيانات ثابتة مشتركة: أسماء الأنواع، أسئلة الاستبيان، أسباب الترشيح، وأنماط القرّاء.
// نفس البيانات المستخدمة في نموذج الواجهة الأولي، منقولة لتُستخدم من السيرفر والعميل معًا.

export const GENRE_LABELS = {
  g_fantasy: 'خيال وفانتازيا',
  g_romance: 'رومانسية',
  g_mystery: 'غموض وتشويق',
  g_classic: 'أدب كلاسيكي',
  g_selfdev: 'تطوير ذات',
  g_history: 'تاريخي',
  g_scifi: 'خيال علمي',
  g_realistic: 'واقعي معاصر',
  g_philosophy: 'فلسفة',
  g_family: 'عائلي واجتماعي',
};

export const TAG_REASONS = {
  a_strongchar: 'لأنك تفضّل الشخصيات القوية والمعقّدة',
  a_growth: 'لأنك تحب رؤية تطوّر واضح للشخصيات',
  a_cleverplot: 'لأنك منجذب للحبكات الذكية والمفاجآت',
  a_richworld: 'لأنك تستمتع بعالم غني وتفاصيل كثيرة',
  a_dialogue: 'لأنك تقدّر الحوارات الممتازة',
  a_language: 'لأنك تحب اللغة والأسلوب الجميل',
  a_philosophical: 'لأنك تنجذب للأفكار الفلسفية والإنسانية',
  a_relationships: 'لأنك تبحث عن علاقات إنسانية عميقة',
  a_facts: 'لأنك تحب اكتساب معلومات وحقائق جديدة',
  a_realistic: 'لأنك تفضّل القصص الواقعية القريبة من الحياة',
  p_slow: 'لأن إيقاعه هادئ يسمح لك بالاستمتاع بالتفاصيل',
  p_fast: 'لأن أحداثه سريعة ومستمرة كما تحب',
  p_balanced: 'لأن إيقاعه متوازن بين الأحداث والتفاصيل',
  m_deep: 'لأنه يميل إلى العمق والمشاعر القوية',
  m_light: 'لأنه خفيف وممتع كما تفضّل هذه الفترة',
  m_dark: 'لأن أجواءه قاتمة كما تستمتع',
  m_bright: 'لأن أجواءه مبهجة',
  m_fantasy: 'لأنه يأخذك إلى عوالم خيالية',
  m_realistic: 'لأنه واقعي وقريب من الحياة',
  c_easy: 'لأنه سهل وسلس القراءة',
  c_focused: 'لأنه يحتاج تركيزًا يناسب رغبتك في الانغماس',
  c_literary: 'لأن أسلوبه أدبي بلغة غنية كما تحب',
  c_interpretive: 'لأنه يترك بعض الأمور لتفسيرك الخاص',
};

export const EMOTION_LABELS = {
  e_happy: 'شعور بالسعادة',
  e_surprise: 'الدهشة',
  e_comfort: 'الراحة',
  e_excite: 'الحماس',
  e_moved: 'التأثر',
  e_inspired: 'الإلهام',
  e_curious: 'الفضول',
  e_learned: 'إحساس بأنك تعلمت شيئًا',
  e_discuss: 'رغبة في مناقشة الكتاب مع أحد',
};

export const GOAL_LABELS = {
  goal_escape: 'الهروب إلى عالم آخر',
  goal_learn: 'التعلّم واكتساب معرفة جديدة',
  goal_relax: 'الاسترخاء وقراءة شيء خفيف',
  goal_emotional: 'قصة تحرّك المشاعر',
  goal_thrill: 'الإثارة والتشويق',
  goal_selfdev: 'تطوير الذات',
  goal_explore: 'استكشاف أفكار وثقافات مختلفة',
  goal_impact: 'كتاب يترك أثرًا بعد الانتهاء منه',
};

export const DEALBREAKER_LABELS = {
  slow_start: 'بداية بطيئة جدًا',
  predictable: 'حبكة متوقعة',
  shallow_char: 'شخصيات سطحية',
  descriptive_heavy: 'كثرة الوصف والتفاصيل',
  hard_language: 'لغة صعبة أو ثقيلة',
  many_characters: 'كثرة الشخصيات',
  ambiguous_end: 'نهاية غير واضحة',
  tragic_end: 'حزن شديد أو نهاية مأساوية',
  violent_content: 'محتوى عنيف أو صادم',
};

export const QUIZ = [
  {
    section: 'نوع القراءة', kind: 'multi', key: 'goals', max: 3,
    title: 'ما الذي تبحث عنه في قراءتك هذه الفترة؟', hint: 'اختر حتى ٣ إجابات تصفك الآن.',
    options: [
      { val: 'goal_escape', label: 'الهروب إلى عالم آخر', tags: ['m_fantasy', 'a_richworld'] },
      { val: 'goal_learn', label: 'التعلّم واكتساب معرفة جديدة', tags: ['a_facts', 'e_learned'] },
      { val: 'goal_relax', label: 'الاسترخاء وقراءة شيء خفيف', tags: ['m_light', 'c_easy'] },
      { val: 'goal_emotional', label: 'قصة تحرّك المشاعر', tags: ['m_deep', 'e_moved'] },
      { val: 'goal_thrill', label: 'الإثارة والتشويق', tags: ['p_fast', 'e_excite'] },
      { val: 'goal_selfdev', label: 'تطوير الذات وتغيير طريقة التفكير', tags: ['a_philosophical', 'e_inspired', 'g_selfdev'] },
      { val: 'goal_explore', label: 'استكشاف أفكار وثقافات مختلفة', tags: ['a_philosophical', 'e_curious', 'g_history'] },
      { val: 'goal_impact', label: 'كتاب يترك أثرًا ويجعلني أفكّر بعده', tags: ['m_deep', 'a_philosophical', 'e_learned'] },
    ],
  },
  {
    section: 'المزاج', kind: 'sliders',
    title: 'ما المزاج الذي تفضّله في القراءة؟', hint: 'حرّك المقياس نحو ما يناسبك أكثر — لا حاجة للمنتصف بالضبط.',
    sliders: [
      { key: 'tone', left: 'هادئ', right: 'مشحون ومتوتر', lowTag: 'm_calm', highTag: 'm_tense' },
      { key: 'warmth', left: 'خفيف ومرح', right: 'عاطفي وعميق', lowTag: 'm_light', highTag: 'm_deep' },
      { key: 'realism', left: 'واقعي', right: 'خيالي', lowTag: 'm_realistic', highTag: 'm_fantasy' },
      { key: 'brightness', left: 'مبهج', right: 'قاتم', lowTag: 'm_bright', highTag: 'm_dark' },
    ],
  },
  {
    section: 'سرعة الأحداث', kind: 'single', key: 'pace',
    title: 'كيف تحب أن تتحرك القصة؟',
    options: [
      { val: 'p_slow', label: 'هادئة وبطيئة؛ أستمتع بالتفاصيل وبناء الشخصيات' },
      { val: 'p_balanced', label: 'متوازنة؛ أريد مزيجًا من الأحداث والتفاصيل' },
      { val: 'p_fast', label: 'سريعة؛ أريد أن يحدث شيء باستمرار' },
      { val: 'p_any', label: 'لا يهمني الإيقاع إذا كانت القصة ممتازة' },
    ],
  },
  {
    section: 'ما يجذبك', kind: 'multi', key: 'attractions', max: 4,
    title: 'ما الذي يجذبك في الكتاب؟', hint: 'اختر حتى ٤ عناصر.',
    options: [
      { val: 'a_strongchar', label: 'شخصيات قوية ومعقّدة' },
      { val: 'a_growth', label: 'تطوّر واضح للشخصيات' },
      { val: 'a_cleverplot', label: 'حبكة ذكية ومفاجآت' },
      { val: 'a_richworld', label: 'عالم غني وتفاصيل كثيرة' },
      { val: 'a_dialogue', label: 'حوارات ممتازة' },
      { val: 'a_language', label: 'لغة وأسلوب كتابة جميل' },
      { val: 'a_philosophical', label: 'أفكار فلسفية أو إنسانية' },
      { val: 'a_relationships', label: 'علاقات إنسانية عميقة' },
      { val: 'a_facts', label: 'معلومات وحقائق جديدة' },
      { val: 'a_realistic', label: 'قصة واقعية تشبه الحياة' },
    ],
  },
  {
    section: 'ما يبعدك', kind: 'multi', key: 'dealbreakers', max: 5,
    title: 'ما الذي يجعلك تترك الكتاب؟', hint: 'سنتجنّب ترشيح كتب تحمل هذه العناصر قدر الإمكان.',
    options: Object.entries(DEALBREAKER_LABELS).map(([val, label]) => ({ val, label })),
  },
  {
    section: 'التجربة العاطفية', kind: 'multi', key: 'emotions', max: 3,
    title: 'إذا أنهيت الكتاب، ماذا تتمنى أن تشعر؟', hint: 'اختر حتى ٣ مشاعر.',
    options: Object.entries(EMOTION_LABELS).map(([val, label]) => ({ val, label })),
  },
  {
    section: 'مستوى التحدي', kind: 'single', key: 'challenge',
    title: 'ما مستوى التحدي الذي تفضّله في القراءة؟',
    options: [
      { val: 'c_easy', label: 'كتاب سهل وسلس' },
      { val: 'c_focused', label: 'كتاب يحتاج إلى تركيز' },
      { val: 'c_literary', label: 'نصوص أدبية ولغة غنية' },
      { val: 'c_interpretive', label: 'كتب تترك بعض الأمور للتفسير' },
    ],
  },
  {
    section: 'الأنواع', kind: 'multi', key: 'lovedGenres', max: 10,
    title: 'ما الأنواع التي تحبها؟', hint: 'يمكنك اختيار أكثر من نوع.',
    options: Object.entries(GENRE_LABELS).map(([val, label]) => ({ val, label })),
  },
  {
    section: 'كتب سابقة', kind: 'text', key: 'favBooksText',
    title: 'اختر ٣ كتب أعجبتك، أو اكتب أسماء كتب تتمنى أن تجد شيئًا يشبهها',
    hint: 'هذا يساعدنا على فهم ذوقك من أمثلة حقيقية، اكتب أسماءً مفصولة بفواصل.',
    placeholder: 'مثال: مئة عام من العزلة، عزازيل...',
  },
];

export const ARCHETYPES = [
  { name: 'القارئ المستكشف', need: ['m_fantasy', 'a_richworld', 'e_curious'], desc: 'يحب القصص التي تأخذه إلى عوالم جديدة، مع حبكة متماسكة وشخصيات قابلة للتطوّر.' },
  { name: 'القارئ العاطفي', need: ['a_relationships', 'e_moved', 'm_deep'], desc: 'ينجذب إلى العلاقات الإنسانية والقصص التي تترك أثرًا بعد انتهائها.' },
  { name: 'صائد الحكايات', need: ['a_cleverplot', 'p_fast', 'e_excite'], desc: 'يهتم بالأحداث والمفاجآت، ويكره القصص المتوقعة أو البطيئة.' },
  { name: 'الباحث عن المعرفة', need: ['a_facts', 'e_learned', 'g_selfdev'], desc: 'يقرأ ليكتسب شيئًا جديدًا، ويفضّل الكتب التي تترك أثرًا فكريًا واضحًا.' },
  { name: 'عاشق الأدب واللغة', need: ['a_language', 'c_literary', 'a_philosophical'], desc: 'يقدّر الأسلوب واللغة بقدر ما يقدّر القصة نفسها، ولا يمانع نصًا يتطلب تركيزًا.' },
  { name: 'القارئ الهادئ', need: ['m_light', 'c_easy', 'e_comfort'], desc: 'يبحث عن قراءة سلسة ومريحة، بعيدة عن التعقيد أو الأجواء القاتمة.' },
];

export const STATUS_LABELS = {
  none: '—', want: 'أريد قراءته', reading: 'أقرأه الآن', done: 'أنهيته', paused: 'متوقف', dnf: 'لم أكمله',
};
