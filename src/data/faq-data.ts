export type FAQCategoryKey =
  | 'getting-started'
  | 'groups-sharing'
  | 'ai-assistant'
  | 'security-privacy'
  | 'app-access';

export interface FAQCategoryMeta {
  key: FAQCategoryKey;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: 'Layers' | 'Users' | 'Zap' | 'Shield' | 'Smartphone';
}

export interface FAQItemData {
  id: string;
  category: FAQCategoryKey;
  subcategory: string;
  question: string;
  answer: string;
  keywords: string[];
  relatedQuestions?: string[];
  status: 'published' | 'under_review';
}

export const FAQ_CATEGORIES: FAQCategoryMeta[] = [
  {
    key: 'getting-started',
    title: 'Getting Started',
    shortDesc: 'Accounts, setup, access',
    longDesc: 'Set up your account, add people and explore the basics.',
    iconName: 'Layers',
  },
  {
    key: 'groups-sharing',
    title: 'Groups & Sharing',
    shortDesc: 'Expenses, splits, settlements',
    longDesc: 'Split expenses, track balances and settle up easily.',
    iconName: 'Users',
  },
  {
    key: 'ai-assistant',
    title: 'AI Assistant',
    shortDesc: 'Insights, privacy, data',
    longDesc: 'Get answers, insights and personalized money guidance.',
    iconName: 'Zap',
  },
  {
    key: 'security-privacy',
    title: 'Security & Privacy',
    shortDesc: 'Data, storage, protection',
    longDesc: 'How we keep your data safe and private.',
    iconName: 'Shield',
  },
  {
    key: 'app-access',
    title: 'App & Access',
    shortDesc: 'Android app, releases',
    longDesc: 'Download the Android app and stay up to date.',
    iconName: 'Smartphone',
  },
];

export const ALL_FAQ_ITEMS: FAQItemData[] = [
  // =========================================================================
  // 1. GETTING STARTED & ACCOUNT MANAGEMENT (Category: getting-started)
  // =========================================================================
  {
    id: 'accounts-guest',
    category: 'getting-started',
    subcategory: 'Account Management',
    question: 'How do accounts and guest participation work in SpendWise?',
    answer:
      'You can create a free account using your email, magic link, or Google sign-in. For roommates or group members who do not wish to download an app, SpendWise allows them to view shared ledgers and payment QR codes via a secure, read-only web link.',
    keywords: ['guest', 'invite', 'sign up', 'register', 'roommate', 'web view', 'magic link', 'google'],
    relatedQuestions: ['create-account', 'join-without-app', 'multiple-devices'],
    status: 'published',
  },
  {
    id: 'what-is-spendwise',
    category: 'getting-started',
    subcategory: 'Account Management',
    question: 'What is SpendWise and how does it work?',
    answer:
      'SpendWise is a modern personal finance and peer-to-peer expense sharing application designed for Android and web. It combines individual net cash flow tracking with roommate group expense splitting, receipt OCR scanning, and 1-tap UPI settlements.',
    keywords: ['what is', 'overview', 'features', 'summary', 'about', 'platform'],
    status: 'published',
  },
  {
    id: 'is-spendwise-free',
    category: 'getting-started',
    subcategory: 'Account Management',
    question: 'Is SpendWise free to use?',
    answer:
      'Yes. SpendWise core personal budgeting, group ledgers, receipt scanning, and UPI settlements are completely free to use with zero hidden fees or subscription walls.',
    keywords: ['pricing', 'cost', 'free', 'subscription', 'charges', 'fees'],
    status: 'published',
  },
  {
    id: 'create-account',
    category: 'getting-started',
    subcategory: 'Account Management',
    question: 'How do I create a SpendWise account?',
    answer:
      'Download the Android APK or open the web app, tap "Get Started", and sign in with Google or enter your email address to receive an instant passwordless sign-in link.',
    keywords: ['sign up', 'register', 'new user', 'start', 'onboarding'],
    status: 'published',
  },
  {
    id: 'google-login',
    category: 'getting-started',
    subcategory: 'Account Management',
    question: 'Can I sign up using Google?',
    answer:
      'Yes. Google OAuth is supported out of the box for quick, secure one-tap authentication on both the web application and Android app.',
    keywords: ['google', 'sso', 'oauth', 'gmail', 'one tap'],
    status: 'published',
  },
  {
    id: 'phone-login',
    category: 'getting-started',
    subcategory: 'Account Management',
    question: 'Can I log in using my phone number?',
    answer:
      'Phone OTP authentication is planned for a future release. Currently, accounts are secured via verified email magic links and Google single sign-on.',
    keywords: ['phone', 'mobile number', 'sms', 'otp'],
    status: 'published',
  },
  {
    id: 'forgot-password',
    category: 'getting-started',
    subcategory: 'Account Management',
    question: 'What should I do if I forget my password?',
    answer:
      'Click the "Forgot Password" link on the sign-in screen to receive an immediate password reset link at your registered email address. If using magic links or Google OAuth, no password is required.',
    keywords: ['password', 'reset', 'forgot', 'recovery', 'login issue'],
    status: 'published',
  },
  {
    id: 'multiple-devices',
    category: 'getting-started',
    subcategory: 'Account Management',
    question: 'Can I use SpendWise on multiple devices?',
    answer:
      'Yes. Your data syncs securely to the cloud, allowing you to access your personal accounts and shared groups simultaneously across your phone, tablet, and desktop browser.',
    keywords: ['sync', 'devices', 'laptop', 'desktop', 'tablet', 'cross platform'],
    status: 'published',
  },
  {
    id: 'use-without-download',
    category: 'getting-started',
    subcategory: 'Account Management',
    question: 'Can I use SpendWise without downloading the Android app?',
    answer:
      'Yes. The SpendWise web application is a fully responsive progressive web app (PWA) that runs smoothly in Chrome, Safari, Firefox, and Edge on any device.',
    keywords: ['web', 'browser', 'pwa', 'without app', 'desktop', 'safari'],
    status: 'published',
  },
  {
    id: 'update-profile',
    category: 'getting-started',
    subcategory: 'Account Management',
    question: 'How do I update my profile information?',
    answer:
      'Navigate to Settings > Profile to update your display name, avatar, and default UPI Virtual Payment Address (VPA) for receiving peer settlements.',
    keywords: ['profile', 'name', 'avatar', 'upi id', 'settings', 'account details'],
    status: 'published',
  },
  {
    id: 'default-currency',
    category: 'getting-started',
    subcategory: 'Account Management',
    question: 'How do I change my default currency?',
    answer:
      'Go to Settings > Preferences > Default Currency. You can select Indian Rupee (INR ₹), US Dollar ($), Euro (€), British Pound (£), and other international currencies.',
    keywords: ['currency', 'rupee', 'dollar', 'euro', 'inr', 'change money format', 'symbol'],
    status: 'published',
  },
  {
    id: 'delete-account',
    category: 'getting-started',
    subcategory: 'Account Management',
    question: 'How do I delete my SpendWise account?',
    answer:
      'Under Settings > Privacy & Security, tap "Delete Account". This permanently removes your profile, authentication credentials, and private personal transactions from our servers.',
    keywords: ['delete', 'remove account', 'close account', 'wipe', 'gdpr'],
    status: 'published',
  },

  // =========================================================================
  // 1B. TRANSACTIONS & PERSONAL FINANCE (Category: getting-started)
  // =========================================================================
  {
    id: 'add-transaction',
    category: 'getting-started',
    subcategory: 'Transactions & Personal Finance',
    question: 'How do I add a new income or expense?',
    answer:
      'Tap the "+" button in the navigation bar (or press shortcut "N" on desktop). Enter the transaction amount, pick an account (Bank, Cash, Credit Card), choose a category, and save.',
    keywords: ['add expense', 'record income', 'new transaction', 'log spend'],
    status: 'published',
  },
  {
    id: 'edit-delete-transaction',
    category: 'getting-started',
    subcategory: 'Transactions & Personal Finance',
    question: 'Can I edit or delete a transaction?',
    answer:
      'Yes. Tap any transaction in your ledger to view its details. From there you can edit the amount, date, notes, category, and source account, or delete it entirely.',
    keywords: ['edit', 'delete', 'remove transaction', 'modify', 'my expenses are wrong'],
    status: 'published',
  },
  {
    id: 'categorize-transactions',
    category: 'getting-started',
    subcategory: 'Transactions & Personal Finance',
    question: 'How do I categorize my transactions?',
    answer:
      'SpendWise includes standard categories like Food & Dining, Groceries, Housing, Utilities, Transit, and Entertainment. It automatically remembers merchant names to auto-fill categories for future entries.',
    keywords: ['categories', 'tags', 'labels', 'dining', 'groceries'],
    status: 'published',
  },
  {
    id: 'custom-categories',
    category: 'getting-started',
    subcategory: 'Transactions & Personal Finance',
    question: 'Can I create custom expense categories?',
    answer:
      'Yes, you can create custom categories with tailored icons and color badges under Settings > Categories to match your personal spending habits.',
    keywords: ['custom category', 'create tag', 'personalize'],
    status: 'published',
  },
  {
    id: 'track-recurring-expenses',
    category: 'getting-started',
    subcategory: 'Transactions & Personal Finance',
    question: 'How do I track recurring expenses and subscriptions?',
    answer:
      'Use the Subscriptions tab to log recurring bills like rent, Netflix, or gym memberships. SpendWise displays upcoming due dates and calculates their monthly burn rate.',
    keywords: ['recurring', 'subscriptions', 'rent', 'monthly bill', 'netflix'],
    status: 'published',
  },
  {
    id: 'record-cash-transactions',
    category: 'getting-started',
    subcategory: 'Transactions & Personal Finance',
    question: 'Can I record cash transactions?',
    answer:
      'Yes. SpendWise includes a dedicated "Cash in Hand" account where you can record physical cash payments and cash withdrawals from ATMs.',
    keywords: ['cash', 'physical money', 'atm withdrawal', 'cash in hand'],
    status: 'published',
  },
  {
    id: 'multiple-accounts-wallets',
    category: 'getting-started',
    subcategory: 'Transactions & Personal Finance',
    question: 'How do I manage multiple bank accounts and wallets?',
    answer:
      'Under the Accounts tab, you can add distinct accounts (e.g. HDFC, ICICI, SBI, Paytm Wallet). SpendWise calculates your liquid balance after factoring in upcoming obligations.',
    keywords: ['bank accounts', 'wallets', 'multiple banks', 'hdfc', 'icici', 'balances'],
    status: 'published',
  },
  {
    id: 'track-credit-cards',
    category: 'getting-started',
    subcategory: 'Transactions & Personal Finance',
    question: 'Can I track credit card expenses?',
    answer:
      'Yes. You can add credit card accounts, specify credit limits and billing cycle dates, and log card expenses to track liability balances separately from cash assets.',
    keywords: ['credit card', 'statement', 'card limit', 'due date'],
    status: 'published',
  },
  {
    id: 'transfer-between-accounts',
    category: 'getting-started',
    subcategory: 'Transactions & Personal Finance',
    question: 'How do I transfer money between my accounts?',
    answer:
      'When adding a transaction, select the "Transfer" tab. Choose the source account and destination account (e.g. Bank to Cash). Transferred amounts adjust balances without affecting income or expense reports.',
    keywords: ['transfer', 'move money', 'account to account', 'internal transfer'],
    status: 'published',
  },
  {
    id: 'search-filter-transactions',
    category: 'getting-started',
    subcategory: 'Transactions & Personal Finance',
    question: 'Can I search and filter transactions?',
    answer:
      'Yes. The transactions ledger offers real-time instant search by merchant name or note, along with filters for date ranges, accounts, categories, and expense types.',
    keywords: ['search', 'filter', 'find transaction', 'date range', 'merchant'],
    status: 'published',
  },
  {
    id: 'export-financial-data',
    category: 'getting-started',
    subcategory: 'Transactions & Personal Finance',
    question: 'Can I export my financial data?',
    answer:
      'Yes. You can export your complete personal transaction ledger, category breakdowns, and group history in standard CSV and JSON formats from Settings > Data Management.',
    keywords: ['export', 'csv', 'download data', 'backup', 'excel export'],
    status: 'published',
  },

  // =========================================================================
  // 2. GROUPS & EXPENSE SHARING (Category: groups-sharing)
  // =========================================================================
  {
    id: 'splitting-math-hamilton',
    category: 'groups-sharing',
    subcategory: 'Expense Splitting',
    question: 'How does SpendWise guarantee zero penny rounding loss on splits?',
    answer:
      'Unlike standard calculators that divide using floating-point math (often causing 33.33 + 33.33 + 33.33 = 99.99), SpendWise performs all financial operations in integer minor units (paise/cents). We use the Hamilton-Hare largest remainder algorithm to distribute residue pennies deterministically, guaranteeing that the sum of splits strictly equals the original total.',
    keywords: ['rounding', 'penny', 'paise', 'hamilton', 'math', 'precision', 'cents', 'split bill'],
    relatedQuestions: ['split-types', 'debt-simplification'],
    status: 'published',
  },
  {
    id: 'debt-simplification',
    category: 'groups-sharing',
    subcategory: 'Expense Splitting',
    question: 'What is debt simplification and why is it useful?',
    answer:
      'When groups share many expenses, circular debts arise (e.g. Alice owes Bob, Bob owes Charlie, Charlie owes Alice). SpendWise runs a greedy network flow algorithm to simplify these IOUs, collapsing N² circular payment paths down to at most N-1 direct payments without altering anyone’s net balance.',
    keywords: ['debt simplification', 'circular debt', 'ious', 'algorithm', 'fewer payments', 'who owes me'],
    relatedQuestions: ['settle-up-process', 'upi-settlement'],
    status: 'published',
  },
  {
    id: 'create-group',
    category: 'groups-sharing',
    subcategory: 'Groups Management',
    question: 'How do I create a group?',
    answer:
      'Go to the Groups tab, tap "New Group", enter a group title (like "Flat 302" or "Goa Trip 2026"), select an icon, and invite your roommates or friends via a link or QR code.',
    keywords: ['create group', 'new group', 'roommates', 'trip', 'shared ledger'],
    status: 'published',
  },
  {
    id: 'invite-friends',
    category: 'groups-sharing',
    subcategory: 'Groups Management',
    question: 'How do I invite friends or roommates?',
    answer:
      'Inside the group, tap "Invite Members" to generate a secure shareable invite link or QR code. Anyone with the link can join instantly using their Google or email account.',
    keywords: ['invite', 'share link', 'qr code', 'add friend', 'roommates'],
    status: 'published',
  },
  {
    id: 'join-without-app',
    category: 'groups-sharing',
    subcategory: 'Groups Management',
    question: 'Can someone join a group without installing the app?',
    answer:
      'Yes. SpendWise provides a read-only web link that lets roommates or friends view ledger balances and pay via UPI directly in their mobile browser without creating an app account.',
    keywords: ['no app', 'guest', 'read-only', 'browser join', 'view balance'],
    status: 'published',
  },
  {
    id: 'multiple-groups',
    category: 'groups-sharing',
    subcategory: 'Groups Management',
    question: 'Can I create separate groups for trips, roommates and office expenses?',
    answer:
      'Yes. You can create unlimited distinct groups, each with its own member list, base currency, expense history, and debt settlement matrix.',
    keywords: ['multiple groups', 'flat', 'office', 'vacation', 'trip'],
    status: 'published',
  },
  {
    id: 'add-shared-expense',
    category: 'groups-sharing',
    subcategory: 'Expense Splitting',
    question: 'How do I add a shared expense?',
    answer:
      'Tap into any group, click "Add Expense", enter the total amount, select who paid the bill, choose participants, and pick your preferred split rule (equal, exact, percentage, or shares).',
    keywords: ['shared expense', 'split bill', 'add group expense', 'dinner split'],
    status: 'published',
  },
  {
    id: 'multiple-payers',
    category: 'groups-sharing',
    subcategory: 'Expense Splitting',
    question: 'Can multiple people pay for one expense?',
    answer:
      'Yes. SpendWise supports multi-payer entries where multiple members contribute different portions of the bill upfront. SpendWise records each contribution and splits the remainder.',
    keywords: ['multiple payers', 'both paid', 'contributed', 'split payment'],
    status: 'published',
  },
  {
    id: 'split-types',
    category: 'groups-sharing',
    subcategory: 'Expense Splitting',
    question: 'What are equal, exact, percentage and share-based splits?',
    answer:
      'Equal divides the cost evenly; Exact allows entering specific currency amounts per person; Percentage lets you allocate portions totaling 100%; and Shares divides expenses by custom units (e.g. 2 shares for couples).',
    keywords: ['split types', 'equal', 'exact', 'percentage', 'shares', 'split rule'],
    status: 'published',
  },
  {
    id: 'exclude-member',
    category: 'groups-sharing',
    subcategory: 'Expense Splitting',
    question: 'Can I exclude a member from a particular expense?',
    answer:
      'Yes. When creating or editing an expense, simply uncheck any member who was not part of that activity (e.g. excluding a roommate who did not attend dinner).',
    keywords: ['exclude', 'opt out', 'uncheck', 'not involved'],
    status: 'published',
  },
  {
    id: 'who-owes-whom',
    category: 'groups-sharing',
    subcategory: 'Expense Splitting',
    question: 'How do I see who owes whom?',
    answer:
      'The group overview displays a summarized net balance card for each participant: positive amounts (green) mean the group owes you money, and negative amounts (red) mean you owe money.',
    keywords: ['who owes me', 'balances', 'group balance', 'net amount', 'debts'],
    status: 'published',
  },
  {
    id: 'edit-shared-expense',
    category: 'groups-sharing',
    subcategory: 'Expense Splitting',
    question: 'Can I edit or delete a shared expense?',
    answer:
      'Yes. Any group member can tap an existing shared expense to modify the amount, payers, or split breakdown. SpendWise instantly recalculates group balances across the board.',
    keywords: ['edit group expense', 'delete shared expense', 'fix bill'],
    status: 'published',
  },
  {
    id: 'leave-group',
    category: 'groups-sharing',
    subcategory: 'Groups Management',
    question: 'What happens when someone leaves a group?',
    answer:
      'A member can leave a group once their net balance is exactly zero. If there are outstanding debts, SpendWise will prompt the user to settle up before leaving.',
    keywords: ['leave group', 'remove member', 'exit', 'settled balance'],
    status: 'published',
  },
  {
    id: 'individual-friends-split',
    category: 'groups-sharing',
    subcategory: 'Expense Splitting',
    question: 'Can I add an expense for someone who is not in a group?',
    answer:
      'Yes. Use the Friends tab to track one-on-one balances directly with individual contacts without needing to create a dedicated group.',
    keywords: ['friend', '1-on-1', 'personal split', 'two people'],
    status: 'published',
  },
  {
    id: 'group-activity-history',
    category: 'groups-sharing',
    subcategory: 'Groups Management',
    question: 'Can I view the complete group expense history?',
    answer:
      'Yes. The Activity tab records an audit log of every expense added, edited, or settled with exact timestamps and member names.',
    keywords: ['activity log', 'history', 'audit trail', 'past expenses'],
    status: 'published',
  },

  // =========================================================================
  // 2B. SETTLEMENTS & UPI PAYMENTS (Category: groups-sharing)
  // =========================================================================
  {
    id: 'upi-settlement',
    category: 'groups-sharing',
    subcategory: 'Settlements & Payments',
    question: 'How do UPI settlements work?',
    answer:
      'When you tap "Settle with UPI", SpendWise generates an authentic NPCI-compliant UPI deep link (upi://pay?pa=...&am=...&cu=INR). Tapping the link on mobile directly opens Google Pay, PhonePe, or Paytm with the payee VPA and exact paise amount pre-filled. We also display a scannable dynamic QR code for desktop users.',
    keywords: ['upi', 'gpay', 'phonepe', 'paytm', 'qr code', 'settle with upi', 'vpa', 'npci'],
    relatedQuestions: ['debt-simplification', 'custody-of-funds'],
    status: 'published',
  },
  {
    id: 'settle-up-process',
    category: 'groups-sharing',
    subcategory: 'Settlements & Payments',
    question: 'How do I settle a balance with a friend?',
    answer:
      'Open the group or friend details, tap "Settle Up", review the simplified amount, and choose "Pay with UPI" on mobile or "Record Cash Payment". Once paid, confirm the settlement to adjust balances.',
    keywords: ['settle up', 'pay friend', 'clear debt', 'balance payment'],
    status: 'published',
  },
  {
    id: 'upi-id-qr-support',
    category: 'groups-sharing',
    subcategory: 'Settlements & Payments',
    question: 'Can I pay using a UPI ID or QR code?',
    answer:
      'Yes. Members can add their UPI ID in their profile settings. SpendWise automatically renders a personalized dynamic UPI QR code that any mobile banking or UPI app can scan.',
    keywords: ['upi id', 'qr code', 'bhim', 'scan qr', 'vpa'],
    status: 'published',
  },
  {
    id: 'custody-of-funds',
    category: 'groups-sharing',
    subcategory: 'Settlements & Payments',
    question: 'Does SpendWise directly transfer money or hold funds?',
    answer:
      'No. SpendWise is completely non-custodial and never holds or routes your money. All payments execute peer-to-peer directly between your bank accounts via UPI or your chosen payment provider.',
    keywords: ['custody', 'wallet balance', 'direct transfer', 'escrow', 'safe'],
    status: 'published',
  },
  {
    id: 'record-cash-settlement',
    category: 'groups-sharing',
    subcategory: 'Settlements & Payments',
    question: 'How do I record a cash settlement?',
    answer:
      'If you settled a balance in cash or via net banking, tap "Record Cash Payment" inside the settlement dialog. This marks the debt as cleared without triggering a UPI deep link.',
    keywords: ['cash settlement', 'offline payment', 'bank transfer', 'paid cash'],
    status: 'published',
  },
  {
    id: 'partial-settlements',
    category: 'groups-sharing',
    subcategory: 'Settlements & Payments',
    question: 'Can I partially settle an outstanding balance?',
    answer:
      'Yes. When opening the Settle Up modal, you can edit the settlement amount to pay a partial sum (e.g. paying ₹1,000 of a ₹2,500 balance). The remaining amount stays active in the ledger.',
    keywords: ['partial settlement', 'part payment', 'custom amount'],
    status: 'published',
  },
  {
    id: 'payment-failure-handling',
    category: 'groups-sharing',
    subcategory: 'Settlements & Payments',
    question: 'What happens if a UPI payment fails?',
    answer:
      'If a UPI transaction fails inside your payment app, simply return to SpendWise and retry or select another payment app. SpendWise does not record the balance as settled until you explicitly confirm completion.',
    keywords: ['upi payment failed', 'transaction failed', 'declined', 'failed'],
    status: 'published',
  },
  {
    id: 'undo-settlement',
    category: 'groups-sharing',
    subcategory: 'Settlements & Payments',
    question: 'Can I undo an incorrectly recorded settlement?',
    answer:
      'Yes. Settlements appear in the group activity history as settlement records. Any participant can delete or edit the settlement record to instantly restore the previous balance.',
    keywords: ['undo settlement', 'reverse payment', 'incorrect settlement'],
    status: 'published',
  },
  {
    id: 'settlement-fees',
    category: 'groups-sharing',
    subcategory: 'Settlements & Payments',
    question: 'Does SpendWise charge any settlement fees?',
    answer:
      'No. SpendWise does not charge any convenience fees, platform markups, or payment processing surcharges for settlements.',
    keywords: ['fees', 'charges', 'commission', 'settlement cost'],
    status: 'published',
  },

  // =========================================================================
  // 3. AI ASSISTANT & FINANCIAL INSIGHTS (Category: ai-assistant)
  // =========================================================================
  {
    id: 'ai-assistant-capabilities',
    category: 'ai-assistant',
    subcategory: 'AI Financial Assistant',
    question: 'What can the SpendWise AI Assistant do?',
    answer:
      'The SpendWise AI Assistant provides natural language answers about your spending habits, summarizes category burn rates, highlights upcoming subscription renewals, and suggests realistic monthly budget targets.',
    keywords: ['assistant', 'ai', 'capabilities', 'features', 'natural language', 'chatbot'],
    status: 'published',
  },
  {
    id: 'ai-data-privacy',
    category: 'ai-assistant',
    subcategory: 'AI Financial Assistant',
    question: 'Does the AI financial assistant train on my personal data?',
    answer:
      'No. SpendWise AI queries your transactions strictly in context through secure, localized retrieval. Your financial transactions and personal details are never sold, shared with ad networks, or used to train public machine learning models. Every query is constrained by PostgreSQL Row Level Security (RLS).',
    keywords: ['train', 'model training', 'privacy', 'rls', 'secure ai', 'openai', 'llm'],
    relatedQuestions: ['ai-access-data', 'ai-modify-transactions'],
    status: 'published',
  },
  {
    id: 'ai-how-to-ask',
    category: 'ai-assistant',
    subcategory: 'AI Financial Assistant',
    question: 'How do I ask questions about my finances?',
    answer:
      'Navigate to the Assistant tab and type natural questions like "How much did I spend on groceries this month?", "What is my biggest expense category?", or "Am I on pace to meet my savings goal?".',
    keywords: ['ask', 'chat', 'prompt', 'assistant queries'],
    status: 'published',
  },
  {
    id: 'ai-analyze-spending',
    category: 'ai-assistant',
    subcategory: 'AI Financial Assistant',
    question: 'Can the assistant analyze my monthly spending trends?',
    answer:
      'Yes. It compares your current month’s day-by-day burn rate against the previous cycle and provides a plain-English executive summary of which categories increased or decreased.',
    keywords: ['analyze spending', 'monthly breakdown', 'comparison', 'insights'],
    status: 'published',
  },
  {
    id: 'ai-unusual-spending',
    category: 'ai-assistant',
    subcategory: 'AI Financial Assistant',
    question: 'Can the assistant identify unusual spending patterns?',
    answer:
      'Yes. Statistical anomaly detection flags transactions that significantly deviate from your 90-day moving average, alerting you to sudden spikes in recurring utilities or dining.',
    keywords: ['anomaly', 'unusual', 'spike', 'fraud alert', 'unexpected charge'],
    status: 'published',
  },
  {
    id: 'ai-create-budget',
    category: 'ai-assistant',
    subcategory: 'AI Financial Assistant',
    question: 'Can the assistant help me create a personalized budget?',
    answer:
      'Yes. You can ask the assistant to generate envelope targets based on the 50/30/20 rule or your historical average monthly expenditures across rent, groceries, and leisure.',
    keywords: ['budget recommendation', '50 30 20', 'spending plan', 'create budget'],
    status: 'published',
  },
  {
    id: 'ai-predict-expenses',
    category: 'ai-assistant',
    subcategory: 'AI Financial Assistant',
    question: 'Can the assistant forecast future cash flow?',
    answer:
      'Using your verified recurring bills and subscription cadence, the assistant projects your liquid account balances 30 days ahead to help you anticipate upcoming cash shortfalls.',
    keywords: ['forecasting', 'predict', 'future cash flow', '30 day projection'],
    status: 'published',
  },
  {
    id: 'ai-modify-transactions',
    category: 'ai-assistant',
    subcategory: 'AI Financial Assistant',
    question: 'Can the AI assistant modify or delete my transactions automatically?',
    answer:
      'No. The AI assistant operates strictly with read-only access. Any proposed financial change (such as creating a new budget or adding an expense) requires your explicit manual confirmation.',
    keywords: ['modify', 'delete', 'read-only', 'permission', 'safety'],
    status: 'published',
  },
  {
    id: 'ai-offline-availability',
    category: 'ai-assistant',
    subcategory: 'AI Financial Assistant',
    question: 'What happens when the AI service is unavailable or offline?',
    answer:
      'All core SpendWise functions—including personal ledgers, group splitting math, budget meters, and UPI QR codes—are powered by deterministic local logic and continue working without interruption.',
    keywords: ['offline', 'service outage', 'down', 'local calculations'],
    status: 'published',
  },
  {
    id: 'ai-delete-chat-history',
    category: 'ai-assistant',
    subcategory: 'AI Financial Assistant',
    question: 'Can I delete my AI conversation history?',
    answer:
      'Yes. You can clear previous chat logs at any time by tapping the "Clear History" button inside the Assistant conversation header.',
    keywords: ['clear chat', 'delete history', 'remove conversation'],
    status: 'published',
  },

  // =========================================================================
  // 3B. BUDGETS, ANALYTICS & INSIGHTS (Category: ai-assistant)
  // =========================================================================
  {
    id: 'create-monthly-budget',
    category: 'ai-assistant',
    subcategory: 'Budgets & Analytics',
    question: 'How do I create a monthly budget envelope?',
    answer:
      'In the Budgets tab, tap "New Budget", select a category (e.g. Dining), and set a monthly spending ceiling. SpendWise tracks your progress in real-time.',
    keywords: ['budget envelope', 'monthly limit', 'create budget', 'target'],
    status: 'published',
  },
  {
    id: 'net-cash-flow',
    category: 'ai-assistant',
    subcategory: 'Budgets & Analytics',
    question: 'What is net cash flow and how is it calculated?',
    answer:
      'Net cash flow is your total received income minus all paid expenses during a calendar period. A positive cash flow indicates your liquid reserves grew over the month.',
    keywords: ['net cash flow', 'income vs expense', 'surplus', 'liquidity'],
    status: 'published',
  },
  {
    id: 'savings-rate',
    category: 'ai-assistant',
    subcategory: 'Budgets & Analytics',
    question: 'How is my savings rate calculated?',
    answer:
      'Savings rate is calculated as: `(Net Income - Total Expenses) / Net Income * 100`. It represents the exact percentage of monthly take-home earnings that was preserved.',
    keywords: ['savings rate', 'percentage saved', 'formula'],
    status: 'published',
  },
  {
    id: 'daily-burn-rate',
    category: 'ai-assistant',
    subcategory: 'Budgets & Analytics',
    question: 'What does daily burn rate mean?',
    answer:
      'Daily burn rate measures your average daily expenditure over the current billing cycle, helping you pace remaining discretionary spending against days left in the month.',
    keywords: ['daily burn', 'burn rate', 'daily average', 'pacing'],
    status: 'published',
  },
  {
    id: 'spending-trends-comparison',
    category: 'ai-assistant',
    subcategory: 'Budgets & Analytics',
    question: 'Can I compare this month with previous months?',
    answer:
      'Yes. The Trends dashboard features interactive bar charts showing month-over-month variances and highlights the top categories driving spending changes.',
    keywords: ['compare months', 'trends', 'month over month', 'variance'],
    status: 'published',
  },
  {
    id: 'budget-alerts',
    category: 'ai-assistant',
    subcategory: 'Budgets & Analytics',
    question: 'Can I set alerts when I am exceeding my budget?',
    answer:
      'Yes. Budget envelopes display visual progress bars that turn amber at 80% consumption and red when exceeded. You can also enable push notifications for threshold alerts.',
    keywords: ['budget alerts', 'over budget', 'warning', 'notifications'],
    status: 'published',
  },

  // =========================================================================
  // 4. SECURITY & PRIVACY (Category: security-privacy)
  // =========================================================================
  {
    id: 'financial-data-security',
    category: 'security-privacy',
    subcategory: 'Data Protection',
    question: 'Is my financial data secure?',
    answer:
      'Yes. SpendWise utilizes bank-grade encryption with TLS 1.3 in transit and AES-256 encryption at rest. Every database table is protected by PostgreSQL Row Level Security (RLS) policies.',
    keywords: ['security', 'encryption', 'aes 256', 'tls', 'rls', 'safe'],
    status: 'published',
  },
  {
    id: 'bank-credentials-policy',
    category: 'security-privacy',
    subcategory: 'Data Protection',
    question: 'Does SpendWise store my bank account passwords or net banking PINs?',
    answer:
      'Never. SpendWise does not ask for or store your bank passwords, net banking credentials, ATM PINs, or debit/credit card CVVs.',
    keywords: ['bank password', 'credentials', 'pin', 'cvv', 'banking access'],
    status: 'published',
  },
  {
    id: 'bank-account-access',
    category: 'security-privacy',
    subcategory: 'Data Protection',
    question: 'Does SpendWise have direct access to debit money from my bank account?',
    answer:
      'No. SpendWise cannot initiate automatic debits or pull funds from your accounts. Settlements are initiated manually by you through authentic UPI intent applications.',
    keywords: ['direct debit', 'pull funds', 'auto debit', 'bank access'],
    status: 'published',
  },
  {
    id: 'custody-clarification',
    category: 'security-privacy',
    subcategory: 'Data Protection',
    question: 'Does SpendWise hold or store my money?',
    answer:
      'No. SpendWise is a non-custodial financial intelligence and ledger software. Settlements occur peer-to-peer directly between your bank accounts and your friends through UPI or your payment provider. We never take custody of your funds.',
    keywords: ['custody', 'store money', 'wallet', 'escrow', 'hold funds'],
    status: 'published',
  },
  {
    id: 'who-can-see-transactions',
    category: 'security-privacy',
    subcategory: 'Privacy Policy',
    question: 'Who can see my personal private transactions?',
    answer:
      'Only you. Your personal accounts, individual income, and private expenses are strictly protected by user-level RLS security keys and cannot be viewed by other users.',
    keywords: ['private transactions', 'who can see', 'confidential', 'privacy'],
    status: 'published',
  },
  {
    id: 'group-privacy-boundary',
    category: 'security-privacy',
    subcategory: 'Privacy Policy',
    question: 'Can group members see my private personal expenses?',
    answer:
      'No. Group members can only view expenses explicitly added to that shared group. Your personal spending, accounts, and other groups remain completely invisible to them.',
    keywords: ['group privacy', 'roommate view', 'shared vs private'],
    status: 'published',
  },
  {
    id: 'third-party-data-sharing',
    category: 'security-privacy',
    subcategory: 'Privacy Policy',
    question: 'Does SpendWise sell or share my data with third parties?',
    answer:
      'No. SpendWise does not sell your personal data, transaction history, or contact lists to data brokers, advertisers, or credit bureaus.',
    keywords: ['sell data', 'third parties', 'advertisers', 'monetization', 'privacy policy'],
    status: 'published',
  },
  {
    id: 'data-deletion-rights',
    category: 'security-privacy',
    subcategory: 'Privacy Policy',
    question: 'Can I permanently delete my financial data?',
    answer:
      'Yes. In Settings > Privacy & Security, you can choose to erase your personal transaction ledger or permanently delete your entire account with full data purge.',
    keywords: ['delete data', 'purge', 'gdpr', 'right to be forgotten', 'erase'],
    status: 'published',
  },
  {
    id: 'active-sessions-management',
    category: 'security-privacy',
    subcategory: 'Data Protection',
    question: 'How do I manage active sessions and logged-in devices?',
    answer:
      'Under Settings > Security, you can review all active web and mobile sessions, see device types and IP locations, and terminate remote sessions with a single click.',
    keywords: ['sessions', 'devices', 'log out remote', 'active login'],
    status: 'published',
  },
  {
    id: 'report-security-concern',
    category: 'security-privacy',
    subcategory: 'Data Protection',
    question: 'How can I report a security vulnerability or concern?',
    answer:
      'Please email our security response team directly at security@spendwise.app with technical details and reproduction steps. We acknowledge reports within 24 hours.',
    keywords: ['security report', 'vulnerability', 'bug bounty', 'disclosure'],
    status: 'published',
  },

  // =========================================================================
  // 5. APP, DOWNLOADS & ACCESS (Category: app-access)
  // =========================================================================
  {
    id: 'android-status',
    category: 'app-access',
    subcategory: 'Android App',
    question: 'Is the Android app ready for download?',
    answer:
      'Yes, you can download the direct APK for Android 10+ devices right now from our download page. The Google Play Store release is currently in early-access beta review. You can also install the Web PWA on any iOS or Android browser instantly.',
    keywords: ['android', 'apk', 'download', 'play store', 'release', 'install'],
    relatedQuestions: ['android-versions', 'app-crashing-troubleshooting'],
    status: 'published',
  },
  {
    id: 'how-to-install-apk',
    category: 'app-access',
    subcategory: 'Android App',
    question: 'How do I download and install the Android APK?',
    answer:
      'Visit spendwise.app/download, tap "Download Android APK (v0.1.0)", open the downloaded package on your phone, and allow installation from your browser when prompted.',
    keywords: ['install apk', 'sideload', 'apk download', 'unknown sources'],
    status: 'published',
  },
  {
    id: 'android-versions',
    category: 'app-access',
    subcategory: 'Android App',
    question: 'Which Android versions are supported?',
    answer:
      'SpendWise supports Android 10 (API level 29) and higher. This ensures fast 60fps gesture animations, hardware biometric unlock, and modern offline database storage.',
    keywords: ['android version', 'compatibility', 'api level', 'android 10'],
    status: 'published',
  },
  {
    id: 'app-crashing-troubleshooting',
    category: 'app-access',
    subcategory: 'Technical Support',
    question: 'What should I do if the app crashes or fails to open?',
    answer:
      'Ensure you have at least 150MB of free device storage and are running Android 10+. Try clearing the app cache via Settings > Apps > SpendWise > Storage > Clear Cache. If issues persist, reinstall the latest APK.',
    keywords: ['crash', 'not opening', 'troubleshoot', 'force close', 'clear cache'],
    status: 'published',
  },
  {
    id: 'offline-sync-behavior',
    category: 'app-access',
    subcategory: 'Technical Support',
    question: 'Why are my transactions not synchronizing?',
    answer:
      'SpendWise is built with an offline-first architecture; all additions are recorded instantly in local SQLite storage. When connectivity is restored, pending entries automatically sync to the cloud.',
    keywords: ['offline sync', 'not syncing', 'sync issue', 'offline mode'],
    status: 'published',
  },
  {
    id: 'notification-permissions',
    category: 'app-access',
    subcategory: 'Technical Support',
    question: 'How do I enable notification permissions on Android?',
    answer:
      'Go to your device Settings > Apps > SpendWise > Notifications, and toggle the switch to "Allowed" so you receive group settlement confirmations and bill reminder alerts.',
    keywords: ['notifications', 'permissions', 'alerts', 'push notification'],
    status: 'published',
  },
  {
    id: 'check-for-updates',
    category: 'app-access',
    subcategory: 'Android App',
    question: 'How do I check for app updates?',
    answer:
      'The app displays an in-app banner whenever a new version is released. You can also check spendwise.app/download at any time to grab the latest release build.',
    keywords: ['update', 'new version', 'changelog', 'latest release'],
    status: 'published',
  },
  {
    id: 'contact-support-team',
    category: 'app-access',
    subcategory: 'Technical Support',
    question: 'How do I contact SpendWise support?',
    answer:
      'You can reach our team anytime at support@spendwise.app or via the "Contact Support" button below. We typically respond to beta feedback within one business day.',
    keywords: ['contact support', 'email support', 'help desk', 'customer care'],
    status: 'published',
  },

  // =========================================================================
  // 5B. RECEIPT SCANNING & DATA IMPORT (Category: app-access)
  // =========================================================================
  {
    id: 'scan-receipt-ocr',
    category: 'app-access',
    subcategory: 'Receipts & Data Import',
    question: 'How do I scan a receipt with SpendWise?',
    answer:
      'Tap the camera icon when adding an expense to capture or upload a paper receipt or invoice. SpendWise’s OCR engine extracts the total amount, merchant name, and date automatically.',
    keywords: ['scan receipt', 'ocr', 'camera', 'photo bill', 'auto scan'],
    status: 'published',
  },
  {
    id: 'supported-receipt-formats',
    category: 'app-access',
    subcategory: 'Receipts & Data Import',
    question: 'Which receipt formats are supported?',
    answer:
      'SpendWise supports JPG, PNG, WEBP, and single-page PDF files up to 10MB in size.',
    keywords: ['receipt formats', 'pdf', 'png', 'jpg', 'file size'],
    status: 'published',
  },
  {
    id: 'edit-extracted-ocr',
    category: 'app-access',
    subcategory: 'Receipts & Data Import',
    question: 'Can I edit receipt details before saving?',
    answer:
      'Yes. Extracted receipt details are presented in a confirmation preview where you can verify or edit amounts, dates, and categories before adding the transaction to your ledger.',
    keywords: ['edit receipt', 'ocr preview', 'verify amount'],
    status: 'published',
  },
  {
    id: 'import-csv-bank-statements',
    category: 'app-access',
    subcategory: 'Receipts & Data Import',
    question: 'How do I import bank statements using CSV or Excel?',
    answer:
      'On the web app, go to Transactions > Import to upload CSV or Excel bank statements. An interactive column mapper lets you pair date, merchant, and debit/credit columns before importing.',
    keywords: ['import statement', 'csv', 'excel', 'bank statement', 'batch upload'],
    status: 'published',
  },
  {
    id: 'duplicate-transaction-detection',
    category: 'app-access',
    subcategory: 'Receipts & Data Import',
    question: 'How does duplicate transaction detection work during import?',
    answer:
      'SpendWise checks matching dates, amounts, and merchant names against your existing records, highlighting potential duplicates so you can skip them with one click.',
    keywords: ['duplicate detection', 'duplicate transactions', 'skip duplicates'],
    status: 'published',
  },

  // =========================================================================
  // 5C. MULTI-CURRENCY & INTERNATIONAL (Category: app-access)
  // =========================================================================
  {
    id: 'multi-currency-trips',
    category: 'app-access',
    subcategory: 'Multi-Currency & Travel',
    question: 'How does multi-currency conversion work on group trips?',
    answer:
      'SpendWise stores both the original currency and amount as an immutable record. When converting for group ledger balance netting, it locks in the official exchange rate on the date of the transaction, ensuring past travel calculations remain stable regardless of future FX market swings.',
    keywords: ['currency conversion', 'fx rates', 'travel', 'group trip', 'forex', 'exchange rate'],
    status: 'published',
  },
  {
    id: 'group-different-currency',
    category: 'app-access',
    subcategory: 'Multi-Currency & Travel',
    question: 'Can group members enter expenses in different foreign currencies?',
    answer:
      'Yes. A member can enter a purchase in EUR, USD, or GBP; SpendWise converts it to the group’s base currency using the verified rate from that day while keeping the original currency visible.',
    keywords: ['foreign currency', 'international trip', 'different currencies'],
    status: 'published',
  },
  {
    id: 'offline-international-travel',
    category: 'app-access',
    subcategory: 'Multi-Currency & Travel',
    question: 'Can I track expenses while travelling internationally without roaming data?',
    answer:
      'Yes. SpendWise operates completely offline. You can log restaurant bills and taxi fares abroad; the app synchronizes and pulls official exchange rates once you connect to hotel Wi-Fi.',
    keywords: ['travel offline', 'no roaming', 'abroad', 'international travel'],
    status: 'published',
  },
];

export function getPublishedFAQs(): FAQItemData[] {
  return ALL_FAQ_ITEMS.filter((item) => item.status === 'published');
}

export function getFAQsByCategory(categoryKey: FAQCategoryKey): FAQItemData[] {
  return ALL_FAQ_ITEMS.filter(
    (item) => item.status === 'published' && item.category === categoryKey
  );
}

export function searchFAQs(query: string): FAQItemData[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return getPublishedFAQs();

  return ALL_FAQ_ITEMS.filter((item) => {
    if (item.status !== 'published') return false;

    // Direct text search
    if (item.question.toLowerCase().includes(clean)) return true;
    if (item.answer.toLowerCase().includes(clean)) return true;
    if (item.subcategory.toLowerCase().includes(clean)) return true;

    // Search in keywords / synonyms
    if (item.keywords.some((kw) => kw.toLowerCase().includes(clean))) return true;

    // Token match for multi-word queries like "upi payment failed"
    const tokens = clean.split(/\s+/).filter(Boolean);
    const textBlob = `${item.question} ${item.answer} ${item.keywords.join(' ')}`.toLowerCase();
    return tokens.every((token) => textBlob.includes(token));
  });
}
