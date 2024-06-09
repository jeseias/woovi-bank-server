export const renderGraphiQL = ({ endpoint }: { endpoint: string }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>GraphiQL</title>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/graphiql/0.17.5/graphiql.min.css" />
        <script src="//cdnjs.cloudflare.com/ajax/libs/react/16.8.4/umd/react.production.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.4/umd/react-dom.production.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/graphiql/0.17.5/graphiql.min.js"></script>
      </head>
      <body style="margin: 0; overflow: hidden;">
        <div id="graphiql" style="height: 100vh;"></div>
        <script>
          const graphQLFetcher = graphQLParams =>
            fetch('${endpoint}', {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(graphQLParams),
            })
              .then(response => response.json())
              .catch(() => response.text());

          ReactDOM.render(
            React.createElement(GraphiQL, { fetcher: graphQLFetcher }),
            document.getElementById('graphiql'),
          );
        </script>
      </body>
    </html>
  `;
};
