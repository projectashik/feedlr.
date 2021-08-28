const base_url = 'http://localhost:3000';
// const base_url = 'https://feedlr.vercel.app';
const css_url = base_url + '/widget.css';

window.addEventListener('DOMContentLoaded', () => {
  const script = document.querySelector('script[data-feedlr-project-id]');
  const projectId = script?.getAttribute('data-feedlr-project-id');
  const rightOffset = script?.getAttribute('data-position-right');
  const bottomOffset = script?.getAttribute('data-position-bottom');
  const mode = script?.getAttribute('data-mode');
  const togglerStyle = script?.getAttribute('data-toggler-style');
  const inputStyle = script?.getAttribute('data-input-style');
  const submitStyle = script?.getAttribute('data-button-style');

  const emojis = ['hate', 'disappointed', 'natural', 'good', 'excellent'];
  let selectedEmoji = '';
  const container = document.createElement('div');
  container.classList.add('feedlr-container');
  if (mode === 'dark') {
    container.classList.add('dark');
  }
  document.body.appendChild(container);

  let fetch_url = base_url + '/api/projects/widget?url=' + window.location.host;
  if (projectId) {
    fetch_url = base_url + '/api/projects/widget?id=' + projectId;
  }

  const init = async () => {
    fetch(fetch_url)
      .then((response) => response.json())
      .then((fetchedData) => {
        if (
          fetchedData.url === window.location.host ||
          fetchedData.setting.localhostEnabled
        ) {
          createToggler();
          createWidget(fetchedData);
          loadStyles(fetchedData.setting);
          const widgetToggler = document.querySelector(
            '.feedlr-widget-toggler'
          );
          console.log(widgetToggler);
          widgetToggler?.addEventListener('click', () => {
            const widget = document.querySelector('.feedlr-widget');
            console.log(widget);
            widget?.classList.toggle('feedlr-widget-show');
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const injectStyleSheet = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = css_url;
    document.head.appendChild(link);
  };

  const createToggler = () => {
    const button = document.createElement('button');
    button.classList.add('feedlr-widget-toggler');
    button.innerText = 'Feedback';
    button.style = togglerStyle;
    container.appendChild(button);
  };

  const createWidget = (data) => {
    const widget = document.createElement('div');
    widget.classList.add('feedlr-widget');
    widget.classList.add('widget-fixed');

    const question = document.createElement('p');
    question.innerText = data.setting
      ? data.setting.question.replaceAll('%name%', data.name)
      : 'What do you think about ' + data.name + '?';
    question.classList.add('feedlr-question');

    const footer = document.createElement('p');
    footer.innerHTML = `
     Widget by <a href="https://feedlr.vercel.app" target="_blank">Feedlr.</a>
    `;
    footer.classList.add('feedlr-footer_text');

    const feedback_form = document.createElement('form');

    feedback_form.classList.add('feedlr-form');

    const emoji_container = document.createElement('div');
    emoji_container.classList.add('feedlr-emoji-container');
    emojis.forEach((emoji) => {
      const emoji_button = document.createElement('button');
      emoji_button.type = 'button';
      emoji_button.classList.add('feedlr-emoji-button');
      emoji_button.setAttribute('data-emoji', emoji);

      emoji_button.addEventListener('click', () => {
        selectedEmoji = emoji;
        const selectedEmojis = document.querySelectorAll(
          '.feedlr-selected-emoji'
        );
        selectedEmojis.forEach((e) => {
          e.classList.remove('feedlr-selected-emoji');
        });
        emoji_button.classList.add('feedlr-selected-emoji');
        feedback_form.classList.add('show');
      });

      const emoji_img = document.createElement('img');
      emoji_img.src = base_url + '/widget/emojis/' + emoji + '.gif';
      emoji_img.width = 40;
      emoji_img.height = 40;

      emoji_button.append(emoji_img);
      emoji_container.appendChild(emoji_button);
    });

    const email_input = document.createElement('input');
    email_input.type = 'email';
    email_input.classList.add('feedlr-email_input');
    email_input.placeholder = 'Enter your email (Optional)';
    email_input.style = inputStyle;

    const feedback_input = document.createElement('textarea');
    feedback_input.required = true;
    feedback_input.classList.add('feedlr-feedback_input');
    feedback_input.placeholder = 'Your feedback';
    feedback_input.style = inputStyle;

    const submit_button = document.createElement('button');
    submit_button.innerText = 'Submit Feedback';
    submit_button.classList.add('feedlr-feedback_submit');
    submit_button.style = submitStyle;

    feedback_form.appendChild(email_input);
    feedback_form.appendChild(feedback_input);
    feedback_form.appendChild(submit_button);
    feedback_form.appendChild(footer);

    const thankyou_window = document.createElement('div');
    thankyou_window.classList.add('feedlr-thankyou-window');
    thankyou_window.innerText = data.setting.thankYouMessage;

    widget.appendChild(question);
    widget.appendChild(emoji_container);
    widget.appendChild(feedback_form);

    container.appendChild(widget);

    feedback_form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email_value = email_input.value;
      const feedback_value = feedback_input.value;
      const from = window.location.href;

      fetch(
        base_url +
          `/api/responses/create?email=${email_value}&feedback=${feedback_value}&from=${from}&projectId=${data.id}&emoji=${selectedEmoji}`
      )
        .then((res) => {
          res.json();
        })
        .then((fetchedDataSome) => {
          if (data.setting.coolDownResponse > 0) {
            let reopenDate = new Date();
            reopenDate.setDate(
              reopenDate.getDate() + parseInt(data.setting.coolDownResponse)
            );
            localStorage.setItem(
              'feedlr-response',
              `{created_at: ${new Date()}, remove_until: ${reopenDate}}`
            );
          }
        });
      widget.removeChild(question);
      widget.removeChild(emoji_container);
      widget.removeChild(feedback_form);
      widget.appendChild(thankyou_window);
      setInterval(() => {
        const container = document.querySelector('.feedlr-container');
        container.style.display = 'none';
      }, 4000);
      // Set the created date in the localStorage
    });
  };

  const loadStyles = (setting) => {
    const root = document.querySelector(':root');
    const body = document.querySelector('.dark');
    if (rightOffset) {
      root.style.setProperty('--feedlr-position-right', rightOffset + 'px');
    }
    if (bottomOffset) {
      root.style.setProperty('--feedlr-position-bottom', bottomOffset + 'px');
    }
    root.style.setProperty(
      '--feedlr-primary-color',
      '#' + (setting ? setting.lightModeButtonColor : '9261DF')
    );
    body?.style.setProperty(
      '--feedlr-primary-color',
      '#' + (setting ? setting.darkModeButtonColor : '9261DF')
    );

    root.style.setProperty(
      '--feedlr-widget-bg',
      '#' + (setting ? setting.lightModeBackground : 'ffffff')
    );
    body?.style.setProperty(
      '--feedlr-widget-bg',
      '#' + (setting ? setting.darkModeBackground : '0F0F0F')
    );

    root.style.setProperty(
      '--feedlr-button-color',
      '#' + (setting ? setting.lightModeButtonColor : '9261DF')
    );
    body?.style.setProperty(
      '--feedlr-button-color',
      '#' + (setting ? setting.darkModeButtonColor : '9261DF')
    );
    root.style.setProperty(
      '--feedlr-text-color',
      '#' + (setting ? setting.lightModeTextColor : '9261DF')
    );
    body?.style.setProperty(
      '--feedlr-text-color',
      '#' + (setting ? setting.darkModeTextColor : '9261DF')
    );
  };
  injectStyleSheet();
  init();
});
