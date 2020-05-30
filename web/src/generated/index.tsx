import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getUsers: Array<User>;
  me?: Maybe<User>;
  getChefs: Array<Chef>;
  getChef: Chef;
};


export type QueryGetChefArgs = {
  userid: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  userid: Scalars['String'];
  email: Scalars['String'];
  friends?: Maybe<Array<Chef>>;
};

export type Chef = {
  __typename?: 'Chef';
  id: Scalars['ID'];
  username: Scalars['String'];
  userid: Scalars['String'];
  rating: Scalars['String'];
  friendof?: Maybe<Array<User>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: Scalars['String'];
  login: Scalars['String'];
  addChef: Scalars['String'];
  updateChef: Scalars['String'];
  removeChef: Scalars['String'];
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationAddChefArgs = {
  data: AddChefInput;
};


export type MutationUpdateChefArgs = {
  userid: Scalars['String'];
};


export type MutationRemoveChefArgs = {
  data: RemoveChefInput;
};

export type CreateUserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  userid: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AddChefInput = {
  userid: Scalars['String'];
  useradding: Scalars['String'];
};

export type RemoveChefInput = {
  userid: Scalars['String'];
  userremove: Scalars['String'];
};

export type AddChefMutationVariables = {
  useradding: Scalars['String'];
  userid: Scalars['String'];
};


export type AddChefMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addChef'>
);

export type CreateUserMutationVariables = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  userid: Scalars['String'];
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createUser'>
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type RemoveChefMutationVariables = {
  userremove: Scalars['String'];
  userid: Scalars['String'];
};


export type RemoveChefMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeChef'>
);

export type UpdateChefMutationVariables = {
  userid: Scalars['String'];
};


export type UpdateChefMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateChef'>
);

export type GetChefQueryVariables = {
  userid: Scalars['String'];
};


export type GetChefQuery = (
  { __typename?: 'Query' }
  & { getChef: (
    { __typename?: 'Chef' }
    & Pick<Chef, 'userid' | 'rating'>
  ) }
);

export type GetUsersQueryVariables = {};


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { getUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'userid'>
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'userid'>
    & { friends?: Maybe<Array<(
      { __typename?: 'Chef' }
      & Pick<Chef, 'userid' | 'rating'>
    )>> }
  )> }
);


export const AddChefDocument = gql`
    mutation AddChef($useradding: String!, $userid: String!) {
  addChef(data: {useradding: $useradding, userid: $userid})
}
    `;
export type AddChefMutationFn = ApolloReactCommon.MutationFunction<AddChefMutation, AddChefMutationVariables>;

/**
 * __useAddChefMutation__
 *
 * To run a mutation, you first call `useAddChefMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddChefMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addChefMutation, { data, loading, error }] = useAddChefMutation({
 *   variables: {
 *      useradding: // value for 'useradding'
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useAddChefMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddChefMutation, AddChefMutationVariables>) {
        return ApolloReactHooks.useMutation<AddChefMutation, AddChefMutationVariables>(AddChefDocument, baseOptions);
      }
export type AddChefMutationHookResult = ReturnType<typeof useAddChefMutation>;
export type AddChefMutationResult = ApolloReactCommon.MutationResult<AddChefMutation>;
export type AddChefMutationOptions = ApolloReactCommon.BaseMutationOptions<AddChefMutation, AddChefMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!, $userid: String!) {
  createUser(data: {name: $name, email: $email, password: $password, userid: $userid})
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(data: {email: $email, password: $password})
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RemoveChefDocument = gql`
    mutation RemoveChef($userremove: String!, $userid: String!) {
  removeChef(data: {userremove: $userremove, userid: $userid})
}
    `;
export type RemoveChefMutationFn = ApolloReactCommon.MutationFunction<RemoveChefMutation, RemoveChefMutationVariables>;

/**
 * __useRemoveChefMutation__
 *
 * To run a mutation, you first call `useRemoveChefMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveChefMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeChefMutation, { data, loading, error }] = useRemoveChefMutation({
 *   variables: {
 *      userremove: // value for 'userremove'
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useRemoveChefMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveChefMutation, RemoveChefMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveChefMutation, RemoveChefMutationVariables>(RemoveChefDocument, baseOptions);
      }
export type RemoveChefMutationHookResult = ReturnType<typeof useRemoveChefMutation>;
export type RemoveChefMutationResult = ApolloReactCommon.MutationResult<RemoveChefMutation>;
export type RemoveChefMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveChefMutation, RemoveChefMutationVariables>;
export const UpdateChefDocument = gql`
    mutation UpdateChef($userid: String!) {
  updateChef(userid: $userid)
}
    `;
export type UpdateChefMutationFn = ApolloReactCommon.MutationFunction<UpdateChefMutation, UpdateChefMutationVariables>;

/**
 * __useUpdateChefMutation__
 *
 * To run a mutation, you first call `useUpdateChefMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChefMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChefMutation, { data, loading, error }] = useUpdateChefMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useUpdateChefMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateChefMutation, UpdateChefMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateChefMutation, UpdateChefMutationVariables>(UpdateChefDocument, baseOptions);
      }
export type UpdateChefMutationHookResult = ReturnType<typeof useUpdateChefMutation>;
export type UpdateChefMutationResult = ApolloReactCommon.MutationResult<UpdateChefMutation>;
export type UpdateChefMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateChefMutation, UpdateChefMutationVariables>;
export const GetChefDocument = gql`
    query GetChef($userid: String!) {
  getChef(userid: $userid) {
    userid
    rating
  }
}
    `;

/**
 * __useGetChefQuery__
 *
 * To run a query within a React component, call `useGetChefQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChefQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChefQuery({
 *   variables: {
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useGetChefQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetChefQuery, GetChefQueryVariables>) {
        return ApolloReactHooks.useQuery<GetChefQuery, GetChefQueryVariables>(GetChefDocument, baseOptions);
      }
export function useGetChefLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetChefQuery, GetChefQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetChefQuery, GetChefQueryVariables>(GetChefDocument, baseOptions);
        }
export type GetChefQueryHookResult = ReturnType<typeof useGetChefQuery>;
export type GetChefLazyQueryHookResult = ReturnType<typeof useGetChefLazyQuery>;
export type GetChefQueryResult = ApolloReactCommon.QueryResult<GetChefQuery, GetChefQueryVariables>;
export function refetchGetChefQuery(variables?: GetChefQueryVariables) {
      return { query: GetChefDocument, variables: variables }
    }
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    name
    userid
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
      }
export function useGetUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = ApolloReactCommon.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export function refetchGetUsersQuery(variables?: GetUsersQueryVariables) {
      return { query: GetUsersDocument, variables: variables }
    }
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    userid
    friends {
      userid
      rating
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export function refetchMeQuery(variables?: MeQueryVariables) {
      return { query: MeDocument, variables: variables }
    }