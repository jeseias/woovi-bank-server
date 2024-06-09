export const renderGraphiQL = ({ endpoint }: { endpoint: string }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>GraphiQL</title>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/graphiql/0.17.5/graphiql.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" />
        <script src="//cdnjs.cloudflare.com/ajax/libs/react/16.8.4/umd/react.production.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.4/umd/react-dom.production.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/graphiql/0.17.5/graphiql.min.js"></script>
      </head>
      <body style="margin: 0;">
        <div id="graphiql" style="height: 70vh;">
        </div>
        <div class="flex flex-col items-center justify-center mt-4 p-2 px-10 h-[30vh]">
          <textarea id="headers" class="w-full h-32 border border-gray-300 rounded-lg p-2 resize-none" placeholder="Enter headers"></textarea>
          <button onclick="updateHeaders()" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">Update Headers</button>
        </div>
        <script>
          let customHeaders; 
          const graphQLFetcher = graphQLParams =>
            fetch('${endpoint}', {
              method: 'post',
              headers: { 
                'Content-Type': 'application/json',
                ...customHeaders
              },
              body: JSON.stringify(graphQLParams),
            })
              .then(response => response.json())
              .catch(() => response.text());

          const updateHeaders = (event) => {
            const headerString = document.getElementById('headers').value;
            console.log(headerString)
            customHeaders = JSON.parse(headerString)
          };

          ReactDOM.render(
            React.createElement(GraphiQL, { fetcher: graphQLFetcher }),
            document.getElementById('graphiql'),
          );
        </script>
      </body>
    </html>
  `;
};
