<template>
  <div>
    <h2>Добавление новой РПД</h2>
    
    <div v-if="isLoading" class="loading-message">
      <p>⏳ Загрузка данных...</p>
    </div>
    
    <form v-else @submit.prevent="submitForm" class="add-form">
      <div class="form-group">
        <label for="disciplineName">Название дисциплины:</label>
        <input 
          type="text" 
          id="disciplineName" 
          v-model="formData.disciplineName" 
          required
        />
      </div>
      
      <div class="form-group">
        <label for="year">Год:</label>
        <input 
          type="number" 
          id="year" 
          v-model="formData.year" 
          min="2000" 
          max="2100" 
          required
        />
      </div>
      
      <div class="form-group">
        <h3>Выбор индикаторов</h3>
        
        <div v-for="competency in competencies" :key="competency.id" class="competency-group">
          <h4>{{ competency.number }}. {{ competency.description }}</h4>
          
          <div v-for="indicator in getIndicatorsForCompetency(competency.number)" 
               :key="indicator.id" 
               class="indicator-item">
            <input 
              type="checkbox" 
              :id="'indicator-' + indicator.id" 
              :value="indicator.number" 
              v-model="formData.selectedIndicators"
            />
            <label :for="'indicator-' + indicator.id">
              {{ indicator.number }}: {{ indicator.description }}
            </label>
          </div>
        </div>
      </div>
      
      <button type="submit" class="submit-btn">Добавить РПД</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RPDAdd',
  data() {
    return {
      isLoading: true,
      formData: {
        disciplineName: '',
        year: new Date().getFullYear(),
        selectedIndicators: []
      },
      competencies: [],
      allIndicators: []
    };
  },
  methods: {
    async fetchCompetencies() {
      try {
        const url = '/api/competencies';
        const res = await fetch(url);
        
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        
        this.competencies = await res.json();
      } catch (e) {
        console.error('Ошибка загрузки компетенций:', e);
        alert('Ошибка загрузки списка компетенций: ' + e.message);
      }
    },
    
    async fetchIndicators() {
      try {
        const promises = this.competencies.map(comp => 
          fetch(`/api/competencies/${comp.number}/indicators`)
        );
        
        const responses = await Promise.all(promises);
        const allData = await Promise.all(responses.map(res => {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          return res.json();
        }));
        
        this.allIndicators = allData.flat();
      } catch (e) {
        console.error('Ошибка загрузки индикаторов:', e);
        alert('Ошибка загрузки индикаторов: ' + e.message);
      }
    },
    
    getIndicatorsForCompetency(competencyNumber) {
      return this.allIndicators.filter(
        indicator => indicator.competencyNumber === competencyNumber
      );
    },
    
    async submitForm() {
      try {
        const url = '/api/rpd';
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            discipline_name: this.formData.disciplineName,
            year: this.formData.year,
            competencyAchievementIndicators: this.formData.selectedIndicators
          })
        });
        
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        
        const newRPD = await res.json();
        alert('РПД успешно добавлена!');
        this.$router.push(`/rpd/view/${newRPD.id}`);
      } catch (e) {
        console.error('Ошибка добавления РПД:', e);
        alert('Ошибка добавления РПД: ' + e.message);
      }
    }
  },
  async mounted() {
    await this.fetchCompetencies();
    await this.fetchIndicators();
    this.isLoading = false;
  }
};
</script>

<style scoped>
.add-form {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9;
}

/* Reuse styles from RPDEdit.vue */
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.competency-group {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

.indicator-item {
  margin: 5px 0;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.submit-btn:hover {
  background-color: #368c6c;
}

.loading-message {
  text-align: center;
  padding: 40px 20px;
  font-size: 1.1em;
  color: #666;
}
</style>
