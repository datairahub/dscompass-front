<template>
  <div class="page page--quizprint">
    <div class="page__wrap">
      <h1 class="page__title">{{form.display_name}}</h1>

      <p class="onlyprint">{{form.custom_name}}<br>{{date}}</p>

      <section class="qprint__list">
        <div
          class="qprint__item"
          v-for="(question, i) in form.questions"
          :key="i">
          <div class="qprint__title">
            <div class="qprint__question">{{question.question}}</div>
          </div>
          <div class="qprint__response">
            <div v-if="!isEditing">{{question.response}}</div>
            <textarea
              rows="6"
              v-if="isEditing"
              v-model="question.response"></textarea>
          </div>
        </div>
      </section>

      <div class="qprint__buttons">
        <button class="btn btn--light" @click="editForm()" v-if="!isEditing">
          {{$t('common.edit')}}
        </button>
        <button class="btn" @click="generateWord()">
          {{$t('common.download_docx')}}
        </button>
        <button class="btn" @click="printPage()">
          PDF
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
} from 'docx';
import { saveAs } from 'file-saver';

export default {
  name: 'QuizPrint',
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    form() {
      return this.$store.getters.form;
    },
    date() {
      const t = new Date();
      return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}`;
    },
  },
  mounted() {
    if (!this.form.id) {
      this.$router.push({ name: 'quizs', params: { locale: this.$i18n.locale } });
    }
  },
  methods: {
    printPage() {
      this.isEditing = false;
      setTimeout(() => { window.print(); }, 250);
    },
    editForm() {
      // this.isEditing = true;
      this.$router.push({
        name: 'quiz-edition',
        params: {
          quizid: this.form.id,
          locale: this.$i18n.locale,
        },
        query: {
          mode: 'continue',
        },
      });
    },
    generateWord() {
      const doc = new Document({
        creator: 'Protection International',
        description: this.form.display_name,
        title: this.form.display_name,
      });

      const paragraphs = [
        new Paragraph({
          children: [
            new TextRun({
              text: this.form.display_name,
              bold: true,
              size: 32, // 16 pt
            }),
          ],
        }),
        new Paragraph(''),
        new Paragraph(`Name: ${this.form.custom_name}`),
        new Paragraph(`Date: ${this.date}`),
        new Paragraph(''),
      ];

      this.form.questions.forEach((question) => {
        paragraphs.push(new Paragraph({
          children: [
            new TextRun({
              text: question.question,
              bold: true,
            }),
          ],
        }));
        paragraphs.push(new Paragraph(question.response || ''));
        paragraphs.push(new Paragraph(''));
      });

      doc.addSection({
        properties: {},
        children: paragraphs,
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `${this.form.display_name}.docx`);
      });
    },
  },
};
</script>

<style lang="scss">
.page--quizprint {
  .page__wrap {
    max-width: 600px;
  }
  .page__intro {
    font-weight: 100;
  }
}

.qprint {
  &__item {
    margin-bottom: 30px;
  }
  &__title {
    border-top: 1px solid #cecece;
    padding: 30px 0 4px;
    margin: 10px 0;
  }
  &__context {
    font-weight: 100;
    font-size: 12px;
    margin-bottom: 7px;
  }
  &__question {
    font-weight: 700;
    font-size: 18px;
    line-height: 1.3;
  }
  &__response {
    font-size: 14px;
    white-space: break-spaces;
    textarea {
      display: block;
      width: 100%;
      border: 0;
      padding: 3px 7px;
    }
  }
  &__buttons {
    display: flex;
    margin: 40px 0 40px;
    padding: 0 10px;
    justify-content: center;
    .btn {
      flex: 1 1 100%;
      max-width: 200px;
    }
  }
}

.onlyprint {
  display: none;
}

@media print {
  .qprint__buttons {
    display: none;
  }
  .onlyprint {
    display: block;
  }
}
</style>
