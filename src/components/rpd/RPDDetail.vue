<template>
  <div>
    <div v-if="isLoading" class="loading-message">
      <p>⏳ Загрузка данных...</p>
    </div>
    
    <div v-else-if="rpd" class="rpd-details">
      <h2>Просмотр РПД: {{ rpd.disciplineName }}</h2>
      
      <div class="rpd-details">
        <div class="detail-item">
          <span class="detail-label">ID:</span>
          <span class="detail-value">{{ rpd.id }}</span>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Год:</span>
          <span class="detail-value">{{ rpd.year }}</span>
        </div>
        
        <h3>Индикаторы достижения компетенций</h3>
        
        <!-- Group indicators by competency -->
        <div v-for="competency in competencies" :key="competency.id" class="competency-group">
          <div v-if="hasIndicatorsInRPD(competency.number)">
            <h4>{{ competency.number }}. {{ competency.description }}</h4>
            
            <div v-for="indicator in getIndicatorsForCompetency(competency.number)" :key="indicator.id" class="indicator">
              <div class="indicator-header">
                <span class="indicator-number">{{ indicator.number }}</span>
                <span class="indicator-description">{{ indicator.description }}</span>
              </div>
              
              <div class="indicator-knowledge">
                <strong>Знать:</strong> {{ indicator.indicatorKnow }}
              </div>
              
              <div class="indicator-ability">
                <strong>Уметь:</strong> {{ indicator.indicatorAble }}
              </div>
              
              <div class="indicator-possession">
                <strong>Владеть:</strong> {{ indicator.indicatorPossess }}
              </div>
              
              <div v-if="indicator.keywords && indicator.keywords.length > 0" class="keywords-section">
                <h5>Ключевые слова:</h5>
                <div class="keywords-list">
                  <span v-for="keyword in indicator.keywords" :key="keyword" class="keyword-tag">
                    {{ keyword }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <h3>Рекомендуемые навыки</h3>
        <div v-for="skill in rpd.recommendedSkills" :key="skill.id" class="recommended-skill">
          <div class="skill-description">
            {{ skill.workSkill.description }}
          </div>
          <div class="skill-coefficient">
            Коэффициент: {{ skill.coefficient }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RPDDetail',
  data() {
    return {
      rpd: null,
      competencies: [], // Added for competencies
      allIndicators: [], // Added for all indicators
      isLoading: true,
    };
  },
  methods: {
    async fetchRPD() {
      const id = this.$route.params.id;
      try {
        const url = `/api/rpd/${id}`;
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        this.rpd = await res.json();
      } catch (e) {
        console.error('RPD details error:', e);
        alert('Ошибка загрузки информации о РПД: ' + e.message);
      }
    },
    
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
      // Get indicators for this competency that are in the RPD
      const rpdIndicatorIds = this.rpd.competencyAchievementIndicators.map(i => i.id);
      return this.allIndicators.filter(indicator => 
        indicator.competencyNumber === competencyNumber && 
        rpdIndicatorIds.includes(indicator.id)
      );
    },
    
    hasIndicatorsInRPD(competencyNumber) {
      return this.getIndicatorsForCompetency(competencyNumber).length > 0;
    }
  },
  async mounted() {
    await this.fetchCompetencies();
    await this.fetchIndicators();
    await this.fetchRPD();
    this.isLoading = false;
  }
};
</script>

<style scoped>
.rpd-details {
  margin-top: 20px;
}

.detail-item {
  margin-bottom: 10px;
}

.detail-label {
  font-weight: bold;
  margin-right: 8px;
}

.indicator {
  background-color: #f8f9fa;
  border-left: 4px solid #42b983;
  padding: 10px 15px;
  margin-bottom: 15px;
  border-radius: 0 4px 4px 0;
}

.indicator-header {
  display: flex;
  align-items: baseline;
  margin-bottom: 8px;
}

.indicator-number {
  font-weight: bold;
  margin-right: 10px;
  font-size: 1.1em;
}

.keywords-section {
  margin-top: 10px;
}

.keywords-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 5px;
}

.keyword-tag {
  background-color: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.recommended-skill {
  background-color: #e7f3ff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.skill-coefficient {
  font-weight: bold;
  margin-top: 5px;
}

.loading-message {
  text-align: center;
  padding: 40px 20px;
  font-size: 1.1em;
  color: #666;
}

.competency-group {
  margin-bottom: 20px;
}
</style>
