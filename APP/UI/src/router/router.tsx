import { createBrowserRouter, NavLink } from 'react-router-dom';
import React, { JSX } from 'react';

export const router = createBrowserRouter([
  {
    path: 'home',
    element: <HomePage />,
  },
  {
    path: 'about',
    element: <AboutPage />,
  },
  {
    path: 'contact',
    element: <ContactPage />,
  },
  {
    path: '',
    element: <MainApp />
  },
  {
    path: '*',
    element: <DefaultElement/>,
  }
]);

function MainApp() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </nav>
      <main>This is the main page</main>
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to my home page.</p>
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <p>Learn more about me.</p>
    </div>
  );
}

function ContactPage() {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>Get in touch with me.</p>
    </div>
  );
}

function DefaultElement(): JSX.Element {
  return <div>Page 404</div>;
}
