import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {ITodo} from "../model/ITodo";
export  const todoApi = createApi({
    reducerPath:'userAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5000/'}),
    tagTypes:['Todo'],
            endpoints:(build)=>({
                fetchAllTodos: build.query<ITodo[],ITodo[]>({
                    query:()=> ({
                        url:'/todos',

                    }),
                    providesTags:
                        result => ['Todo']

                }),
                createTodo:
                    build.mutation<ITodo,ITodo>({
                        query:(todo)=> ({
                            url:'/todos',
                            method:'POST',
                            body:todo

                        }),
                        invalidatesTags:['Todo'],
                    }),
                updateTodo :
                    build.mutation<ITodo,ITodo>({
                        query:(todo)=> ({
                            url:`/todos/${todo.id}`,
                            method:'PUT',
                            body:todo

                        }),
                        invalidatesTags:['Todo'],
                    }),

            })
})
