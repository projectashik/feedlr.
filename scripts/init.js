const base_url = 'https://feedlr.vercel.app';
const css_url = base_url + '/widget.css';

window.addEventListener('DOMContentLoaded', () => {
  const emojis = ['hate', 'disappointed', 'natural', 'good', 'excellent'];
  let selectedEmoji = '';
  const container = document.createElement('div');
  container.classList.add('feedlr-container');
  document.body.appendChild(container);

  const init = async () => {
    console.log('Fetching', window.location.host + 'http');
    try {
      fetch('/api/projects/widget?url=' + window.location.host)
        .then((response) => response.json())
        .then((fetchedData) => {
          createToggler();
          createWidget(fetchedData);
          loadStyles(fetchedData.setting);
        });
    } catch (error) {
      console.log("Project doesn't exist in the feedlr. dashboard");
      console.log('error');
    }
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
    email_input.required = true;
    email_input.classList.add('feedlr-email_input');
    email_input.placeholder = 'Enter your email';

    const feedback_input = document.createElement('textarea');
    feedback_input.required = true;
    feedback_input.classList.add('feedlr-feedback_input');
    feedback_input.placeholder = 'Your feedback';

    const submit_button = document.createElement('button');
    submit_button.innerText = 'Submit Feedback';
    submit_button.classList.add('feedlr-feedback_submit');

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

      console.log('Form Submitted');
      widget.removeChild(question);
      widget.removeChild(emoji_container);
      widget.removeChild(feedback_form);
      widget.appendChild(thankyou_window);
      setInterval(() => {
        const container = document.querySelector('.feedlr-container');
        container.style.display = 'none';
      }, 4000);
    });
  };

  const loadStyles = (setting) => {
    const root = document.querySelector(':root');
    const body = document.querySelector('.dark');
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
