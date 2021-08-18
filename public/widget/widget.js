const base_url = 'http://localhost:3000';
const emojis_fields = document.querySelectorAll('.emoji_radio');
const feedback_section = document.querySelector('.feedback_section');
let reaction;
emojis_fields.forEach((field) => {
  field.addEventListener('change', (e) => {
    feedback_section.style.display = 'flex';
    reaction = field.value;
    window.parent.postMessage('reaction_selected');
  });
});

const submit_button = document.querySelector('.submit_button');
submit_button.addEventListener('click', async () => {
  // const res = await axios.post(base_url + '/api/responses/create');
});
