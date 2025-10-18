exports.validateContact = (body) => {
  const errors = [];
  if (!body.name || body.name.trim().length < 2) errors.push('name is required (min 2 chars)');
  if (!body.email || !/^\S+@\S+\.\S+$/.test(body.email)) errors.push('valid email is required');
  if (!body.message || body.message.trim().length < 5) errors.push('message is required (min 5 chars)');
  if (errors.length) {
    return { error: { details: [{ message: errors.join(', ') }] } };
  }
  return { value: { name: body.name.trim(), email: body.email.trim(), phone: body.phone ? body.phone.trim() : '', message: body.message.trim() } };
};