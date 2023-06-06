const buildPosts = (state, postsDiv, i18next) => {
  const postsContainer = document.createElement('div');
  postsContainer.classList.add('card', 'border-0');

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('card-body');
  
  const header = document.createElement('h2');
  header.classList.add('card-title', 'h4');
  header.textContent = i18next.t('headers.postsHeader');
  
  headerDiv.append(header);
  postsContainer.append(headerDiv);


  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  state.data.posts.forEach((post) => {

    const { title, link, id } = post;

    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const a = document.createElement('a');
    a.setAttribute('href', link);
    a.classList.add('fw-bold');
    a.setAttribute('data-id', id);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.textContent = title;

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = i18next.t('buttons.postButton');

    li.append(a, button);
    ul.append(li);
  });

  postsContainer.append(ul);
  postsDiv.append(postsContainer);
};

const buildFeeds = (state, feedDiv) => {
  const feedContainer = document.createElement('div');
  feedContainer.classList.add('card', 'border-0');

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('card-body');
  
  const header = document.createElement('h2');
  header.classList.add('card-title', 'h4');
  header.textContent = i18next.t('headers.feedsHeader');
  
  headerDiv.append(header);
  feedContainer.append(headerDiv);

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  state.data.posts.forEach((feed) => {
    const { title, decription } = feed;

    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');

    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = title;

    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50')
    p.textContent = decription;

    li.append(h3, p);
    li.append(ul);
  });
  feedContainer.append(ul);
  feedDiv.append(feedContainer);
};

const handleProcess = (elements, initialState, value, i18next) => {
  switch (value) {
    case 'sending': {
      elements.submitButton.disabled = true;
      break;
    }
    case 'sent': {
      elements.submitButton.disabled = false;
      elements.form.reset();
      elements.input.focus();
      elements.input.classList.remove('is-invalid');
      elements.statusFeedback.classList.remove('text-danger');
      elements.statusFeedback.classList.add('text-success');
      elements.statusFeedback.textContent = i18next.t('feedback.success');
      break;
    }
    case 'error': {
      elements.submitButton.disabled = false;
      elements.statusFeedback.classList.add('text-danger');
      elements.statusFeedback.classList.remove('text-success');
      break;
    }
    default:
      break;
  }
};

const handleValidation = (elements, valid) => {
  if (valid === true) {
    elements.input.classList.remove('is-invalid');
    return;
  }
  if (valid === false) {
    elements.input.classList.add('is-invalid');
  }
};

const handleError = (elements, error) => {
  const { errorMessage } = error;
  elements.statusFeedback.textContent = i18next.t(errorMessage);
};

export default (elements, initialState, i18next) => (path, value) => {
  console.log('0');
  switch (path) {
    case 'form.valid':
      console.log('1');
      handleValidation(elements, value);
      break;
    case 'form.processState':
      console.log('2');
      handleProcess(elements, initialState, value, i18next);
      break;
    case 'form.errors':
      console.log('3');
      handleError(elements, value, i18next);
      break;
    default:
      break;
  }
};
