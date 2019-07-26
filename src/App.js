import React, { Component } from 'react';
import axios from 'axios';
import RepositoryOwner from './components/repositoryOwner';
import queries from './queries';

const TITLE = 'React GraphQL GitHub Client';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
      }`,
  },
});

const getIssuesOfRepository = (path, cursor) => {
  console.log('------------------------------------');
  console.log(queries);
  console.log('------------------------------------');
  const [login, repository] = path.split('/');
  return axiosGitHubGraphQL.post('', {
    query: queries.GET_ISSUES_OF_REPOSITORY,
    variables: { login, repository, cursor },
  });
};

const resolveIssuesQuery = (queryResult, cursor) => state => {
  const { data, errors } = queryResult.data;

  if (!cursor) {
    return {
      repositoryOwner: data.repositoryOwner,
      errors,
    };
  }

  const { edges: oldIssues } = state.repositoryOwner.repository.issues;
  const { edges: newIssues } = data.repositoryOwner.repository.issues;
  const updatedIssues = [...oldIssues, ...newIssues];

  return {
    repositoryOwner: {
      ...data.repositoryOwner,
      repository: {
        ...data.repositoryOwner.repository,
        issues: {
          ...data.repositoryOwner.repository.issues,
          edges: updatedIssues,
        },
      },
    },
    errors,
  };
};

const addStarToRepository = repositoryId => {
  return axiosGitHubGraphQL.post('', {
    query: queries.ADD_STAR,
    variables: { repositoryId },
  });
};

const resolveAddStarMutation = mutationResult => state => {
  const {
    viewerHasStarred,
  } = mutationResult.data.data.addStar.starrable;

  const { totalCount } = state.repositoryOwner.repository.stargazers;

  return {
    ...state,
    repositoryOwner: {
      ...state.repositoryOwner,
      repository: {
        ...state.repositoryOwner.repository,
        viewerHasStarred,
        stargazers: {
          totalCount: totalCount + 1,
        },
      },
    },
  };
};

const removeStarFromRepository = repositoryId => {
  return axiosGitHubGraphQL.post('', {
    query: queries.REMOVE_STAR,
    variables: { repositoryId },
  });
};

const resolveRemoveStarMutation = mutationResult => state => {
  const {
    viewerHasStarred,
  } = mutationResult.data.data.removeStar.starrable;

  const { totalCount } = state.repositoryOwner.repository.stargazers;

  return {
    ...state,
    repositoryOwner: {
      ...state.repositoryOwner,
      repository: {
        ...state.repositoryOwner.repository,
        viewerHasStarred,
        stargazers: {
          totalCount: totalCount - 1,
        },
      },
    },
  };
};

class App extends Component {
  state = {
    path: 'Ojvind/react-graphql-github-vanilla',
    repositoryOwner: null,
    errors: null,
  };

  componentDidMount() {
    this.onFetchFromGitHub(this.state.path);
  }

  onChange = event => {
    this.setState({ path: event.target.value });
  };

  onSubmit = event => {
    this.onFetchFromGitHub(this.state.path);

    event.preventDefault();
  };

  onFetchFromGitHub = (path, cursor) => {
    getIssuesOfRepository(path, cursor).then(queryResult =>
      this.setState(resolveIssuesQuery(queryResult, cursor)),
    );
  };

  onFetchMoreIssues = () => {
    const {
      endCursor,
    } = this.state.repositoryOwner.repository.issues.pageInfo;

    this.onFetchFromGitHub(this.state.path, endCursor);
  };

  onStarRepository = (repositoryId, viewerHasStarred) => {
    if (viewerHasStarred) {
      removeStarFromRepository(repositoryId).then(mutationResult =>
        this.setState(resolveRemoveStarMutation(mutationResult)),
      );
    } else {
      addStarToRepository(repositoryId).then(mutationResult =>
        this.setState(resolveAddStarMutation(mutationResult)),
      );
    }
  };

  render() {
    const { path, repositoryOwner, errors } = this.state;

    return (
      <div>
        <h1>{TITLE}</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">
            Show open issues for https://github.com/
          </label>
          <input
            id="url"
            type="text"
            value={path}
            onChange={this.onChange}
            style={{ width: '300px' }}
          />
          <button type="submit">Search</button>
        </form>

        <hr />

        {repositoryOwner ? (
          <RepositoryOwner
            repositoryOwner={repositoryOwner}
            errors={errors}
            onFetchMoreIssues={this.onFetchMoreIssues}
            onStarRepository={this.onStarRepository}
          />
        ) : (
            <p>No information yet ...</p>
          )}
      </div>
    );
  }
}

export default App;