import React, { useState } from 'react';
import { API, graphqlOperation } from '@aws-amplify/api';
import { createContact } from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';

// Add this type guard function at the top of your file, outside of your component
function isGraphQLError(error: unknown): error is { errors: any[]; message: string } {
  return typeof error === 'object' && error !== null && 'errors' in error && 'message' in error;
}

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    const contactInput = {
      ...formState,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    console.log('Submitting contact:', contactInput);

    try {
      const result = await API.graphql(graphqlOperation(createContact, { input: contactInput }));
      console.log('Mutation result:', result);
      setStatus('Message sent successfully!');
      setFormState({ name: '', email: '', message: '' });
    } catch (error: unknown) {
      console.error('Error:', error);
      if (isGraphQLError(error)) {
        if (error.errors) {
          console.error('GraphQL errors:', error.errors);
        }
        if (error.message) {
          console.error('Error message:', error.message);
        }
      } else if (error instanceof Error) {
        console.error('Error message:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Join the Movement</h2>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex flex-wrap -mx-2 mb-6">
            <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-lg text-lg font-semibold bg-white border border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300"
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 rounded-lg text-lg font-semibold bg-white border border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300"
              />
            </div>
          </div>
          <div className="mb-6">
            <textarea
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              placeholder="Your Message"
              required
              className="w-full px-4 py-3 rounded-lg text-lg bg-white border border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300 h-40 resize-none"
            ></textarea>
          </div>
          <div className="text-center">
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </div>
        </form>
        {status && <p className="text-center mt-4 text-lg font-semibold">{status}</p>}
      </div>
    </section>
  );
};

export default ContactForm;