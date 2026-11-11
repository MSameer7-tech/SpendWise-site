'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Layers,
  Users,
  Zap,
  Shield,
  Smartphone,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Headphones,
  ArrowRight,
  HelpCircle,
  LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import {
  FAQ_CATEGORIES,
  ALL_FAQ_ITEMS,
  type FAQCategoryKey,
} from '@/data/faq-data';

const ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  Users,
  Zap,
  Shield,
  Smartphone,
};

export function FAQClient() {
  const [activeCategory, setActiveCategory] = useState<FAQCategoryKey>('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestionIds, setOpenQuestionIds] = useState<Record<string, boolean>>({
    'accounts-guest': true, // First question expanded by default to match reference
  });
  const [isMac, setIsMac] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Detect platform for Cmd+K vs Ctrl+K shortcut display
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
    }
  }, []);

  // Keyboard shortcut (Cmd+K / Ctrl+K / slash)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered items based on search query
  const searchResults = useMemo(() => {
    const clean = searchQuery.trim().toLowerCase();
    if (!clean) return null;

    const tokens = clean.split(/\s+/).filter(Boolean);

    return ALL_FAQ_ITEMS.filter((item) => {
      if (item.status !== 'published') return false;
      const textBlob = `${item.question} ${item.answer} ${item.subcategory} ${item.keywords.join(' ')}`.toLowerCase();
      return tokens.every((token) => textBlob.includes(token));
    });
  }, [searchQuery]);

  // Questions for the currently active category
  const activeCategoryItems = useMemo(() => {
    return ALL_FAQ_ITEMS.filter(
      (item) => item.status === 'published' && item.category === activeCategory
    );
  }, [activeCategory]);

  const activeCategoryMeta = useMemo(() => {
    return FAQ_CATEGORIES.find((cat) => cat.key === activeCategory)!;
  }, [activeCategory]);

  const toggleQuestion = (id: string) => {
    setOpenQuestionIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCategorySelect = (categoryKey: FAQCategoryKey) => {
    setActiveCategory(categoryKey);
    setSearchQuery(''); // clear search when explicitly selecting a category
    // Open first question of new category if none open
    const firstItem = ALL_FAQ_ITEMS.find((it) => it.category === categoryKey);
    if (firstItem && !openQuestionIds[firstItem.id]) {
      setOpenQuestionIds((prev) => ({
        ...prev,
        [firstItem.id]: true,
      }));
    }
  };

  return (
    <div className="pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20">
      <Container size="lg" className="space-y-8 sm:space-y-10">
        {/* ================================================================= */}
        {/* 1. HERO SECTION                                                   */}
        {/* ================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* Heading with styled emerald italic "Questions." */}
          <h1 className="text-fluid-h1 font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5] [text-wrap:balance]">
            Frequently Asked{' '}
            <span className="italic font-semibold text-emerald-700 dark:text-[#34D399]">
              Questions.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-fluid-lead text-slate-600 dark:text-[#B3BAC2] [text-wrap:balance] max-w-2xl mx-auto">
            Everything you need to know about SpendWise — accounts, expense sharing, UPI settlements, privacy and more.
          </p>

          {/* Search Field with Cmd+K */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="relative flex items-center rounded-2xl border border-slate-200 dark:border-[#343B42] bg-white/95 dark:bg-[#1C2024] shadow-xs hover:border-slate-300 dark:hover:border-[#4B5563] transition-colors focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-600 dark:focus-within:border-[#34D399]">
              <Search className="h-4 w-4 text-slate-400 dark:text-muted-foreground ml-4 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a question..."
                className="w-full bg-transparent py-3 pl-3 pr-20 text-sm sm:text-base text-slate-900 dark:text-[#F5F5F5] placeholder:text-slate-400 dark:placeholder:text-[#858E98] focus:outline-none"
                aria-label="Search FAQ questions"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-[#F5F5F5] hover:bg-slate-100 dark:hover:bg-[#272D33] transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <div className="absolute right-3.5 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-md border border-slate-200 dark:border-[#343B42] bg-slate-50 dark:bg-[#22272C] text-[11px] font-medium text-slate-500 dark:text-[#858E98]">
                  <span>{isMac ? '⌘' : 'Ctrl'}</span>
                  <span>K</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. CATEGORY NAVIGATION CARDS (5 Horizontal Cards)                */}
        {/* ================================================================= */}
        {!searchQuery && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {FAQ_CATEGORIES.map((category) => {
              const Icon = ICON_MAP[category.iconName] || Layers;
              const isActive = activeCategory === category.key;

              return (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => handleCategorySelect(category.key)}
                  className={`flex flex-col items-start p-4 rounded-xl text-left transition-all duration-150 border cursor-pointer ${
                    isActive
                      ? 'bg-[#ecfdf5] border-emerald-500/80 dark:bg-[#123D32]/50 dark:border-[#34D399] shadow-xs ring-1 ring-emerald-500/30'
                      : 'bg-white/85 dark:bg-[#1C2024]/85 border-slate-200/90 dark:border-[#343B42] hover:bg-slate-50/80 dark:hover:bg-[#22272C] hover:border-slate-300 dark:hover:border-[#4B5563]'
                  }`}
                  aria-pressed={isActive}
                >
                  <div
                    className={`p-2 rounded-lg mb-3 ${
                      isActive
                        ? 'text-emerald-700 dark:text-[#34D399] bg-emerald-100/70 dark:bg-[#1B352E]'
                        : 'text-slate-600 dark:text-[#B3BAC2] bg-slate-100/70 dark:bg-[#22272C]'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3
                    className={`text-sm font-bold tracking-tight mb-0.5 ${
                      isActive
                        ? 'text-emerald-950 dark:text-[#F5F5F5]'
                        : 'text-slate-900 dark:text-[#F5F5F5]'
                    }`}
                  >
                    {category.title}
                  </h3>
                  <p
                    className={`text-xs ${
                      isActive
                        ? 'text-emerald-800/80 dark:text-[#B3BAC2]'
                        : 'text-slate-500 dark:text-[#858E98]'
                    }`}
                  >
                    {category.shortDesc}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* ================================================================= */}
        {/* 3. ACCORDION / GROUPED FAQ SECTION                                */}
        {/* ================================================================= */}
        <div className="max-w-5xl mx-auto">
          {searchQuery ? (
            /* SEARCH RESULTS VIEW */
            <div className="rounded-2xl border border-slate-200/90 dark:border-[#343B42] bg-white/90 dark:bg-[#1C2024]/90 backdrop-blur-xs shadow-xs p-5 sm:p-7 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A3036]">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-emerald-600 dark:text-[#34D399]" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-[#F5F5F5]">
                    {searchResults && searchResults.length > 0
                      ? `Found ${searchResults.length} result${searchResults.length > 1 ? 's' : ''} for "${searchQuery}"`
                      : `No results for "${searchQuery}"`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-medium text-emerald-700 dark:text-[#34D399] hover:underline"
                >
                  Clear search
                </button>
              </div>

              {searchResults && searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((item) => {
                    const isOpen = !!openQuestionIds[item.id];
                    return (
                      <div
                        key={item.id}
                        className={`rounded-xl transition-colors border ${
                          isOpen
                            ? 'bg-[#ecfdf5]/80 dark:bg-[#123D32]/35 border-emerald-200/70 dark:border-emerald-800/50 p-4 sm:p-5'
                            : 'bg-white dark:bg-[#1C2024] border-slate-200/70 dark:border-[#2A3036] hover:bg-slate-50/50 dark:hover:bg-[#22272C]/50 p-4'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="inline-block text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-[#1B352E] text-emerald-700 dark:text-[#34D399]">
                            {item.subcategory}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleQuestion(item.id)}
                          className="flex w-full items-start justify-between text-left gap-3 group"
                        >
                          <h4 className="text-base font-semibold text-slate-900 dark:text-[#F5F5F5] group-hover:text-emerald-700 dark:group-hover:text-[#34D399] transition-colors">
                            {item.question}
                          </h4>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 shrink-0 text-emerald-700 dark:text-[#34D399] mt-0.5" />
                          ) : (
                            <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 dark:text-[#858E98] mt-0.5" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="pt-2.5 text-sm sm:text-base text-slate-600 dark:text-[#B3BAC2] leading-relaxed">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty state when search yields no matches */
                <div className="text-center py-12 px-4 space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-[#22272C] text-slate-400">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900 dark:text-[#F5F5F5]">
                      No matching questions found
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-[#858E98] max-w-md mx-auto">
                      Try searching with broader terms like &ldquo;UPI&rdquo;, &ldquo;split bill&rdquo;, &ldquo;privacy&rdquo;, or browse by category above.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap justify-center gap-2">
                    {['UPI', 'Split bill', 'Who owes me', 'Zero penny', 'Privacy', 'Export'].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1 rounded-full text-xs font-medium border border-slate-200 dark:border-[#343B42] bg-white dark:bg-[#22272C] hover:border-emerald-500 text-slate-700 dark:text-[#F5F5F5] transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* DEFAULT GROUPED CATEGORY VIEW (Matching Reference Image) */
            <div className="rounded-2xl border border-slate-200/90 dark:border-[#343B42] bg-white/90 dark:bg-[#1C2024]/90 backdrop-blur-xs shadow-xs overflow-hidden">
              {/* Active Category Panel */}
              <div className="p-5 sm:p-7 border-b border-slate-200/80 dark:border-[#2A3036]">
                <div className="flex items-center gap-3.5 mb-6">
                  {(() => {
                    const ActiveIcon = ICON_MAP[activeCategoryMeta.iconName] || Layers;
                    return (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100/80 dark:bg-[#1B352E] text-emerald-700 dark:text-[#34D399]">
                        <ActiveIcon className="h-5 w-5" />
                      </div>
                    );
                  })()}
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F5F5F5]">
                      {activeCategoryMeta.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-[#858E98]">
                      {activeCategoryMeta.longDesc}
                    </p>
                  </div>
                </div>

                {/* List of questions for the active category */}
                <div className="space-y-3">
                  {activeCategoryItems.map((item) => {
                    const isOpen = !!openQuestionIds[item.id];
                    return (
                      <div
                        key={item.id}
                        className={`rounded-xl transition-all duration-150 ${
                          isOpen
                            ? 'bg-[#ecfdf5]/85 dark:bg-[#123D32]/35 border border-emerald-200/70 dark:border-emerald-800/40 p-4 sm:p-5'
                            : 'border-b border-slate-100 dark:border-[#2A3036]/60 py-3.5 sm:py-4 px-2 hover:bg-slate-50/50 dark:hover:bg-[#22272C]/40 rounded-lg'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleQuestion(item.id)}
                          className="flex w-full items-center justify-between text-left gap-4 group cursor-pointer"
                          aria-expanded={isOpen}
                        >
                          <span
                            className={`text-sm sm:text-base ${
                              isOpen
                                ? 'font-bold text-slate-900 dark:text-[#F5F5F5]'
                                : 'font-medium text-slate-800 dark:text-[#F5F5F5] group-hover:text-emerald-700 dark:group-hover:text-[#34D399]'
                            } transition-colors`}
                          >
                            {item.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 shrink-0 text-emerald-700 dark:text-[#34D399]" />
                          ) : (
                            <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 dark:text-[#858E98] group-hover:text-slate-600 dark:group-hover:text-[#F5F5F5]" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="pt-3 text-sm sm:text-base text-slate-600 dark:text-[#B3BAC2] leading-relaxed">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Collapsed Category Rows (Matching Reference Image) */}
              <div className="divide-y divide-slate-100 dark:divide-[#2A3036]/60">
                {FAQ_CATEGORIES.filter((cat) => cat.key !== activeCategory).map((cat) => {
                  const CatIcon = ICON_MAP[cat.iconName] || Layers;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => handleCategorySelect(cat.key)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50/70 dark:hover:bg-[#22272C]/50 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-[#22272C] text-slate-500 dark:text-[#B3BAC2] group-hover:bg-emerald-50 dark:group-hover:bg-[#1B352E] group-hover:text-emerald-700 dark:group-hover:text-[#34D399] transition-colors">
                          <CatIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-[#F5F5F5] group-hover:text-emerald-700 dark:group-hover:text-[#34D399] transition-colors">
                            {cat.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-[#858E98]">
                            {cat.longDesc}
                          </p>
                        </div>
                      </div>
                      <ChevronDown className="h-5 w-5 text-slate-400 dark:text-[#858E98] group-hover:text-slate-700 dark:group-hover:text-[#F5F5F5] transition-colors" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* 4. BOTTOM SUPPORT CTA BANNER (Matching Reference Image)           */}
        {/* ================================================================= */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-700/40 bg-[#e8f7f0] dark:bg-[#152e27]/80 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-[#1B352E] text-emerald-800 dark:text-[#34D399] shadow-2xs">
                <Headphones className="h-6 w-6" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F5F5F5]">
                  Still have a question?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B3BAC2]">
                  Our team is here to help you get the most out of SpendWise.
                </p>
              </div>
            </div>

            <a
              href="mailto:mohammadsameerwork@gmail.com?subject=SpendWise%20Support%20Inquiry"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#064e3b] hover:bg-[#064e3b]/90 text-white dark:bg-[#10B981] dark:text-[#071A14] dark:hover:bg-[#34D399] px-5 py-2.5 text-sm font-semibold shadow-xs transition-colors shrink-0"
            >
              Contact Support
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
