class UserInfo {

  constructor(form, nameContainer, jobContainer, api, userPhoto, close) {
    this.nameContainer = nameContainer;
    this.jobContainer = jobContainer;
    this.form = form;
    this.api = api;
    this.userPhoto = userPhoto;
    this.close = close;
  }

  defaultProfile() {
    this.api.getProfile()
      .then(res => {
        this.nameContainer.textContent = res.name;
        this.jobContainer.textContent = res.about;
        this.userPhoto.style.backgroundImage = `url(${res.avatar})`;
        this.getUserInfo(res);
      })
      .catch(err => console.log(err.message));
  }

  updateUserInfo(userData) {
    this.name = userData.name;
    this.job = userData.about;
    this.api.patchProfile(this.name, this.job)
      .then(() => {
        this.setUserInfo()
        // Можно лучше
        // По идее, класс с даными юзера не должен знать о существовании модальных окон и, как следствие,
        // не должен их закрывать. Лучшей практикой в данном случае было бы из этого метода updateUserInfo вернуть промис
        // и уже разобрать его в точке вызова метода и там решить, закрывать окно или нет.
        // Если будете менять реализацию, то учтите, что  catch здесь должен вернуть Promise.reject,
        // иначе в точке вызова будет непонятно как прошел запрос.
        this.close();
      })
      .catch(err => console.log(err.message));
  }

  setUserInfo() {
    this.nameContainer.textContent = this.name;
    this.jobContainer.textContent = this.job;
  }

  getUserInfo(data) {
    this.form.elements.name.value = data.name;
    this.form.elements.job.value = data.about;
  }
}

