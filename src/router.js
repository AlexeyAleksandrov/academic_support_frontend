import { createRouter, createWebHistory } from 'vue-router';
import RPDView from './components/rpd/RPDView.vue';
import RPDDetail from './components/rpd/RPDDetail.vue';
import RPDEdit from './components/rpd/RPDEdit.vue';
import RPDAdd from './components/rpd/RPDAdd.vue';

// Заглушки для страниц, заменим на реальные компоненты позже
const CompetenceView = { template: '<div>Компетенции: Просмотр</div>' };
const CompetenceAdd = { template: '<div>Компетенции: Добавить</div>' };
const IndicatorView = { template: '<div>Индикаторы: Просмотр</div>' };
const IndicatorAdd = { template: '<div>Индикаторы: Добавить</div>' };
const TechnologyView = { template: '<div>Технологии: Просмотр</div>' };
const TechnologyUpdateVacancies = { template: '<div>Технологии: Обновить по вакансиям</div>' };
const TechnologyMatchKeywords = { template: '<div>Технологии: Соотнести с ключевыми словами</div>' };
const TechnologyDemand = { template: '<div>Технологии: Рассчитать востребованность</div>' };
const TechGroupView = { template: '<div>Группы технологий: Просмотр</div>' };
const TechGroupAdd = { template: '<div>Группы технологий: Добавить</div>' };
const TechGroupMatch = { template: '<div>Группы технологий: Соотнести с технологиями</div>' };
const TechGroupDemand = { template: '<div>Группы технологий: Рассчитать востребованность</div>' };
const KeywordView = { template: '<div>Ключевые слова: Просмотр</div>' };
const KeywordAdd = { template: '<div>Ключевые слова: Добавить</div>' };
const VacancyView = { template: '<div>Вакансии: Просмотр</div>' };
const VacancyUpdate = { template: '<div>Вакансии: Обновить</div>' };
const ExpertView = { template: '<div>Эксперты: Просмотр</div>' };
const ExpertAdd = { template: '<div>Эксперты: Добавить</div>' };
const OpinionView = { template: '<div>Мнения экспертов: Просмотр</div>' };
const OpinionAdd = { template: '<div>Мнения экспертов: Добавить</div>' };

const routes = [
  { path: '/rpd/view', component: RPDView },
  { path: '/rpd/view/:id', component: RPDDetail },
  { path: '/rpd/edit/:id', component: RPDEdit },
  { path: '/rpd/add', component: RPDAdd },
  { path: '/competence/view', component: CompetenceView },
  { path: '/competence/add', component: CompetenceAdd },
  { path: '/indicator/view', component: IndicatorView },
  { path: '/indicator/add', component: IndicatorAdd },
  { path: '/technology/view', component: TechnologyView },
  { path: '/technology/update-vacancies', component: TechnologyUpdateVacancies },
  { path: '/technology/match-keywords', component: TechnologyMatchKeywords },
  { path: '/technology/demand', component: TechnologyDemand },
  { path: '/techgroup/view', component: TechGroupView },
  { path: '/techgroup/add', component: TechGroupAdd },
  { path: '/techgroup/match', component: TechGroupMatch },
  { path: '/techgroup/demand', component: TechGroupDemand },
  { path: '/keyword/view', component: KeywordView },
  { path: '/keyword/add', component: KeywordAdd },
  { path: '/vacancy/view', component: VacancyView },
  { path: '/vacancy/update', component: VacancyUpdate },
  { path: '/expert/view', component: ExpertView },
  { path: '/expert/add', component: ExpertAdd },
  { path: '/opinion/view', component: OpinionView },
  { path: '/opinion/add', component: OpinionAdd },
  { path: '/', redirect: '/rpd/view' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
