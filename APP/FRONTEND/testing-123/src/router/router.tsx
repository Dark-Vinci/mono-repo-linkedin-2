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
//
// function About(): JSX.Element {
//   return <div>Page about</div>;
// }
//
// export const router =  createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     loader: () => ({ message: 'what is going wrong' }),
//   },
//
//   {
//     index: true,
//     path: '/about',
//     loader: () => ({ message: 'what is going wrong' }),
//     Component: () => {
//       const data = useLoaderData() as { message: string };
//       return <div className="abc">{data.message}</div>;
//     },
//   },
//
//   {
//     path: '*',
//     element: <DefaultElement />,
//   },
// ], {basename: '/my-app'});
//
// // children: [
// //   props.isVerified
// //     ? {
// //       path: '/:id',
// //       element: <div>This is the about page</div>,
// //       loader: () => ({ message: 'what is going wrong' }),
// //       index: true,
// //
// //       Component: () => {
// //         const data = useLoaderData() as { message: string };
// //         return <div className={style.App}>{data.message}</div>;
// //       },
// //     }
// //     : {},
// // ],
//
// // Component: <div>This is the componenet to be redered</div>,
// // action: todosAction,
// // loader: todosLoader,
// // Component: TodosList,
// // ErrorBoundary: TodosBoundary,
// // children: [
// //   {
// //     path: ":id",
// //     loader: todoLoader,
// //     Component: Todo,
// //   },
// // ],
//
// // async lazy() {
// //   let { dashboardMessagesLoader, DashboardMessages } = await import(
// //     "./pages/Dashboard"
// //   );
// //   return {
// //     loader: dashboardMessagesLoader,
// //     Component: DashboardMessages,
// //   };
// // },
//
//
// // async lazy() {
// //   const { ErrorBoundary } = await import('../components');
// //   console.log({ ErrorBoundary });
// //
// //   return {
// //     Component: <div>This is the about page</div>,
// //     loader: {},
// //   } as any;
//
// // children: [
// //   {
// //     index: true,
// //     loader: () => ({ message: 'what is going wrong' }),
// //     Component: () => {
//       const data = useLoaderData() as { message: string };
//       return <div className="abc">{data.message}</div>;
//     },
//   },
//
//   {
//     path: '/about',
//     element: <About/>,
//     index: true,
//     // errorElement: <div>Error Element</div>
//   },
//
//   {
//     path: '*',
//     element: <DefaultElement />,
//   },
// ],