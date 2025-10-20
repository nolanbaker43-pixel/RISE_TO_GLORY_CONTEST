document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const team = document.getElementById('team').value;
  const whatsapp = document.getElementById('whatsapp').value;
  const msg = document.getElementById('message');
  msg.textContent = 'Registration submitted successfully!';
  msg.style.color = 'gold';
  e.target.reset();
});