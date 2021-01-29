<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input v-model="search" placeholder="Rechercher" />
        <el-table
          @row-click="selectCategory"
          :data="
            categories.filter(
              data =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <p>Niveau: {{ props.row.level }}</p>
              <p>Date: {{ props.row.timestamp }}</p>
              <p>Questions: {{ props.row.nb.length }}</p>
            </template>
          </el-table-column>
          <el-table-column label="Catégories" prop="name"> </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="17" :offset="1">
        <div class="questions">
          <div
            class="question box"
            v-for="(question, index) in questions"
            :key="question.id"
          >
            <el-row>
              <el-col :span="2">
                <div class="number">{{ index + 1 }}</div>
              </el-col>
              <el-col :span="22">
                <el-row>
                  <label for="question">Question</label>
                  <el-input
                    id="question"
                    type="textarea"
                    autosize
                    placeholder="Question"
                    v-model="question.question"
                  >
                  </el-input>
                </el-row>
                <el-row>
                  <label for="answer">Réponse</label>
                  <el-input
                    id="answer"
                    type="textarea"
                    autosize
                    :placeholder="Réponse"
                    v-model="question.answer"
                  >
                  </el-input>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-button type="primary" round>Ajouter</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      questions: [],
      search: ""
    };
  },
  async asyncData({ $db }) {
    const categories = await $db
      .from("categories")
      .select("*, nb:question_to_category(category)")
      .then(res => {
        return res.data;
      });
    console.log(categories);
    return { categories };
  },
  methods: {
    async selectCategory(row) {
      const result = await this.$db
        .from("question_to_category")
        .select("questions (question, answer)")
        .eq("category", row.id)
        .then(res => {
          return res.data;
        });
      console.log(result);
      this.questions = result.map(q => q.questions);
    }
  }
};
</script>

<style>
.box {
  border: 1px solid lightgray;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
}

.question.box {
  width: 100%;
}
label {
  font-size: 0.8em;
  color: lightskyblue;
}
.number {
  display: block;
}
</style>
