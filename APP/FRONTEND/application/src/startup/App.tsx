import { useEffect } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  useLoaderData,
} from 'react-router-dom';

import style from './styles/App.module.css';
import './styles/variables.css';

// let [searchParams, setSearchParams] = useSearchParams();
//   let paramValue = searchParams.get(key);

// let resolved = useResolvedPath(to);
//   let match = useMatch({ path: resolved.pathname, end: true });

// let [searchParams] = useSearchParams();
//   let isActive = searchParams.get("brand") === brand;
// let { id } = useParams<"id">();

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <div> saving a brother </div>,
      loader: () => 'na so',
      children: [
        {
          index: true,
          loader: () => ({ message: 'what is going wrong' }),
          Component: () => {
            const data = useLoaderData() as { message: string };
            return <div className={style.App}>{data.message}</div>;
          },

          // Component: <div>This is the componenet to be redered</div>,
          // action: todosAction,
          // loader: todosLoader,
          // Component: TodosList,
          // ErrorBoundary: TodosBoundary,
          // children: [
          //   {
          //     path: ":id",
          //     loader: todoLoader,
          //     Component: Todo,
          //   },
          // ],

          // async lazy() {
          //   let { dashboardMessagesLoader, DashboardMessages } = await import(
          //     "./pages/Dashboard"
          //   );
          //   return {
          //     loader: dashboardMessagesLoader,
          //     Component: DashboardMessages,
          //   };
          // },
        },

        {
          path: '/about',
          errorElement: <div>Error Element</div>,

          async lazy() {
            const { ErrorBoundary } = await import('@components');
            console.log({ ErrorBoundary });

            return {
              Component: <div>This is the about page</div>,
              loader: {},
            } as any;
          },

          children: [
            {
              path: '/:id',
              element: <div>This is the about page</div>,
              loader: () => ({ message: 'what is going wrong' }),
              index: true,

              Component: () => {
                const data = useLoaderData() as { message: string };
                return <div className={style.App}>{data.message}</div>;
              },
            },
          ],
        },

        {
          path: '*',
          element: <div>Page 404</div>,
        },
      ],
    },
  ],

  { basename: '/my-app' },
);

export function App() {
  useEffect(() => {
    const el = getComputedStyle(document.documentElement);
    const a = el.getPropertyValue(CSSProperties.MAIN_COLOR);

    el.setProperty(CSSProperties.MAIN_COLOR, '#000000');

    console.log({ a });
    return () => {
      console.log('final cleanup work');
    };
  }, []);

  return (
    <RouterProvider router={router} fallbackElement={<div>WEB-APP</div>} />
  );
}
