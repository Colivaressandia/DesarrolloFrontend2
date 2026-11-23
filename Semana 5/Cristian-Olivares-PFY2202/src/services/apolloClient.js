import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const fetchConTimeout = async (uri, options = {}) => {
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), 8000);
  try {
    return await fetch(uri, { ...options, signal: controlador.signal });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('El servidor GraphQL tardó demasiado en responder', { cause: error });
    }
    throw error;
  } finally {
    clearTimeout(temporizador);
  }
};

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: `${import.meta.env.BASE_URL}graphql`, fetch: fetchConTimeout }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: { keyArgs: ['destinoSlug'] },
    },
  }),
});
