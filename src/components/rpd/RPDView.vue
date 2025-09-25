<template>
  <div>
    <h2>Список РПД</h2>
    
    <!-- Индикатор загрузки -->
    <div v-if="isLoading" class="loading-message">
      <p>⏳ Загрузка данных...</p>
    </div>
    
    <!-- Сообщение об отсутствии данных -->
    <div v-else-if="!isLoading && rpds.length === 0" class="no-data-message">
      <p>📋 Нет информации о РПД</p>
    </div>
    
    <!-- Таблица с данными -->
    <table v-else class="rpd-table">
      <thead>
        <tr>
          <th>№</th>
          <th>Название</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rpd, index) in rpds" :key="rpd.id">
          <td>{{ index + 1 }}</td>
          <td>{{ rpd.disciplineName }}</td>
          <td>
            <button @click="viewRPD(rpd.id)" title="Просмотр">👁️</button>
            <button @click="editRPD(rpd.id)" title="Редактировать">✏️</button>
            <button @click="confirmDeleteRPD(rpd.id)" title="Удалить">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h3>Информация о РПД</h3>
        <pre>{{ selectedRPD }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RPDView',
  data() {
    return {
      rpds: [],
      showModal: false,
      selectedRPD: null,
      isLoading: true,
    };
  },
  methods: {
    async fetchRPDs() {
      try {
        const url = '/api/rpd';
        console.log('Fetching RPDs from:', url);
        
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        this.rpds = await res.json();
        console.log('Received RPD data:', this.rpds);
      } catch (e) {
        console.error('RPD fetch error:', e);
        alert('Ошибка загрузки РПД: ' + e.message);
      } finally {
        this.isLoading = false;
      }
    },
    async viewRPD(id) {
      this.$router.push(`/rpd/view/${id}`);
    },
    editRPD(id) {
      this.$router.push({ path: `/rpd/edit/${id}` });
    },
    async confirmDeleteRPD(id) {
      if (confirm('Вы уверены, что хотите удалить РПД?')) {
        await this.deleteRPD(id);
      }
    },
    async deleteRPD(id) {
      try {
        const url = `/api/rpd/${id}`;
        console.log('Deleting RPD at:', url);
        
        const res = await fetch(url, { method: 'DELETE' });
        
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        this.fetchRPDs();
      } catch (e) {
        console.error('Delete RPD error:', e);
        alert('Ошибка удаления РПД: ' + e.message);
      }
    },
  },
  mounted() {
    this.fetchRPDs();
  },
};
</script>

<style scoped>
.rpd-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.rpd-table th, .rpd-table td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
}
.rpd-table th {
  background: #f6f8fa;
}
button {
  margin-right: 6px;
  font-size: 1.2em;
  background: none;
  border: none;
  cursor: pointer;
}
button:hover {
  color: #42b983;
}
.modal {
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  min-width: 350px;
  max-width: 600px;
  box-shadow: 0 2px 12px #0002;
}
.close {
  float: right;
  font-size: 1.5em;
  cursor: pointer;
}
.loading-message, .no-data-message {
  text-align: center;
  padding: 40px 20px;
  font-size: 1.1em;
  color: #666;
  background: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
}
.loading-message p {
  margin: 0;
  animation: pulse 1.5s ease-in-out infinite alternate;
}
@keyframes pulse {
  from { opacity: 0.6; }
  to { opacity: 1; }
}
</style>
