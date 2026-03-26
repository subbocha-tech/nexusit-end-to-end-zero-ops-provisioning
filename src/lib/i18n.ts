import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const resources = {
  en: {
    translation: {
      nav: {
        dashboard: 'Dashboard',
        catalog: 'App Catalog',
        requests: 'My Requests',
        approvals: 'Approvals',
        licenses: 'Licenses',
        billing: 'Billing',
      },
      dashboard: {
        title: 'IT Operations Overview',
        welcome: 'Welcome back, Admin',
        stats: {
          totalSpend: 'Monthly Spend',
          activeLicenses: 'Active Licenses',
          pendingRequests: 'Pending Approvals',
          utilization: 'Avg. Utilization',
        },
        recentActivity: 'Recent Activity',
        quickActions: 'Quick Actions',
        requestReset: 'Reset Password',
        requestNewApp: 'Request New App',
      },
      catalog: {
        title: 'App Catalog',
        subtitle: 'Self-service software provisioning',
        search: 'Search applications...',
        request: 'Request Access',
        requested: 'Requested',
        categories: {
          all: 'All Apps',
          productivity: 'Productivity',
          development: 'Development',
          finance: 'Finance',
        }
      },
      billing: {
        title: 'Billing & Financials',
        subtitle: 'Automated SaaS spend tracking',
        monthlyTrend: 'Monthly Spend Trend',
        breakdown: 'Cost Breakdown by App',
        department: 'Department',
        amount: 'Amount',
        status: 'Status',
      },
      common: {
        status: {
          pending: 'Pending',
          approved: 'Approved',
          rejected: 'Rejected',
          provisioned: 'Provisioned',
        },
        viewAll: 'View All',
      }
    },
  },
  ja: {
    translation: {
      nav: {
        dashboard: 'ダッシュボード',
        catalog: 'アプリカタログ',
        requests: '自分の申請',
        approvals: '承認待ち',
        licenses: 'ライセンス管理',
        billing: '請求・支払',
      },
      dashboard: {
        title: 'IT運用オーバービュー',
        welcome: 'おかえりなさい、管理者様',
        stats: {
          totalSpend: '月次支出',
          activeLicenses: '有効ライセンス',
          pendingRequests: '承認待ち申請',
          utilization: '平均利用率',
        },
        recentActivity: '最近のアクティビティ',
        quickActions: 'クイックアクション',
        requestReset: 'パスワードリセット',
        requestNewApp: '新規アプリ申請',
      },
      catalog: {
        title: 'アプリカタログ',
        subtitle: 'セルフサービス・ソフトウェアプロビジョニング',
        search: 'アプリを検索...',
        request: '利用申請',
        requested: '申請済み',
        categories: {
          all: 'すべて',
          productivity: '生産性',
          development: '開発',
          finance: '財務',
        }
      },
      billing: {
        title: '請求と財務',
        subtitle: '自動SaaS支出トラッキング',
        monthlyTrend: '月次支出推移',
        breakdown: 'アプリ別コスト内訳',
        department: '部署',
        amount: '金額',
        status: 'ステータス',
      },
      common: {
        status: {
          pending: '保留中',
          approved: '承認済み',
          rejected: '却下',
          provisioned: 'プロビジョニング済み',
        },
        viewAll: 'すべて見る',
      }
    },
  },
};
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;