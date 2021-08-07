'use strict';

module.exports = {
  setMessage: setMessage
};

const MESSAGES = [
  'Can you repeat the question, Professor?',
  'Do we have to submit the assignment this week?',
  'When is homework 3 due, Professor?',
  'What would be the syllabus for the coming test?',
  'Can you please explain the last concept again?',
  'Professor, can you also upload the pdf document in the chat?',
];

function setMessage(context, events, done) {
  // pick a message randomly
  const index = Math.floor(Math.random() * MESSAGES.length);
  // make it available to templates as "message"
  context.vars.message = MESSAGES[index];
  return done();
}
