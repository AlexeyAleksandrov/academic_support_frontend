<template>
  <header class="header">
    <h1>Academic Support</h1>
  </header>
  <nav class="sidebar">
    <ul>
      <li>РПД
        <ul>
          <li><router-link to="/rpd/view">Просмотр</router-link></li>
          <li><router-link to="/rpd/add">Добавить</router-link></li>
        </ul>
      </li>
      <li>Компетенции
        <ul>
          <li><router-link to="/competence/view">Просмотр</router-link></li>
          <li><router-link to="/competence/add">Добавить</router-link></li>
        </ul>
      </li>
      <li>Индикаторы
        <ul>
          <li><router-link to="/indicator/view">Просмотр</router-link></li>
          <li><router-link to="/indicator/add">Добавить</router-link></li>
        </ul>
      </li>
      <li>Технологии
        <ul>
          <li><router-link to="/technology/view">Просмотр</router-link></li>
          <li><router-link to="/technology/update-vacancies">Обновить по вакансиям</router-link></li>
          <li><router-link to="/technology/match-keywords">Соотнести с ключевыми словами</router-link></li>
          <li><router-link to="/technology/demand">Рассчитать востребованность</router-link></li>
        </ul>
      </li>
      <li>Группы технологий
        <ul>
          <li><router-link to="/techgroup/view">Просмотр</router-link></li>
          <li><router-link to="/techgroup/add">Добавить</router-link></li>
          <li><router-link to="/techgroup/match">Соотнести с технологиями</router-link></li>
          <li><router-link to="/techgroup/demand">Рассчитать востребованность</router-link></li>
        </ul>
      </li>
      <li>Ключевые слова
        <ul>
          <li><router-link to="/keyword/view">Просмотр</router-link></li>
          <li><router-link to="/keyword/add">Добавить</router-link></li>
        </ul>
      </li>
      <li>Вакансии
        <ul>
          <li><router-link to="/vacancy/view">Просмотр</router-link></li>
          <li><router-link to="/vacancy/update">Обновить</router-link></li>
        </ul>
      </li>
      <li>Эксперты
        <ul>
          <li><router-link to="/expert/view">Просмотр</router-link></li>
          <li><router-link to="/expert/add">Добавить</router-link></li>
        </ul>
      </li>
      <li>Мнения экспертов
        <ul>
          <li><router-link to="/opinion/view">Просмотр</router-link></li>
          <li><router-link to="/opinion/add">Добавить</router-link></li>
        </ul>
      </li>
    </ul>
  </nav>
  <main class="main-content">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'MainLayout',
};
</script>

<style scoped>
.header {
  background: #2c3e50;
  color: #fff;
  padding: 16px 32px;
  font-size: 1.7em;
}
.sidebar {
  float: left;
  width: 260px;
  background: #f6f8fa;
  min-height: 100vh;
  padding: 20px 0 20px 20px;
  box-sizing: border-box;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar > ul > li {
  margin-bottom: 18px;
}
.sidebar ul ul {
  margin-top: 8px;
  margin-left: 10px;
}
.sidebar a {
  color: #2c3e50;
  text-decoration: none;
  display: block;
  margin-bottom: 4px;
  padding: 2px 0;
  transition: color 0.2s;
}
.sidebar a.router-link-active {
  color: #42b983;
  font-weight: bold;
}
.main-content {
  margin-left: 280px;
  padding: 32px 32px 32px 0;
  min-height: 100vh;
  background: #fff;
}
</style>
