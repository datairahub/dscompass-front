export default class {
  /**
   * Group Answers by their FormAnswers
   */
  static groupAnswersByFormAnswers(formAnswers) {
    return formAnswers.reduce((acc, o) => {
      if (Object.hasOwnProperty.call(acc, o.formanswer.id)) {
        acc[o.formanswer.id].push(o);
      } else {
        acc[o.formanswer.id] = [o];
      }
      return acc;
    }, {});
  }

  /**
   * Get answers adapted to display them
   * @param answersGroup: Answers grouped by FormAnswers
   */
  static getAnswersGroupData(answersGroup) {
    return Object.keys(answersGroup).map((key) => ({
      id: +key,
      answers: answersGroup[key],
      answers_length: answersGroup[key].length,
      answers_percent: (answersGroup[key].length
        / answersGroup[key][0].formanswer.form.questions_length)
        * 100,
      form: answersGroup[key][0].formanswer.form,
      created: answersGroup[key][0].formanswer.created,
      modified: answersGroup[key][0].formanswer.modified,
    }));
  }

  /**
   * Get answers adapted to display them
   * @param answersGroup: Answers grouped by FormAnswers
   */
  static getFormAnswerData(formAnswer) {
    return {
      ...formAnswer,
      answers_length: formAnswer.answers.length,
      answers_percent: (formAnswer.answers.length
        / formAnswer.form.questions_length)
        * 100,
      // created: formAnswer.answers[0].formanswer.created,
      // modified: formAnswer.answers[0].formanswer.modified,
    };
  }

  /**
   * Get answers from a form
   * @param form: Form
   */
  static getAnswersFromForm(form) {
    return form.questions
      .filter((question) => question.response)
      .map((question) => ({
        value: question.response,
        question: question.id,
      }));
  }

  /**
   * Get form with filled answers from a FormAnswer
   * @param formanswer: FormAnswer
   */
  static fillFormFromFormAnswer(formanswer) {
    const { form } = formanswer;
    const formQuestionIds = form.questions.map((q) => q.id);

    formanswer.answers.forEach((answer) => {
      const questionIdx = formQuestionIds.indexOf(answer.question.id);
      if (questionIdx > -1) {
        form.questions[questionIdx].response = answer.value_u;
      }
    });
    form.custom_name = formanswer.name;

    return form;
  }
}
