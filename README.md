<img height="128px" width="128px" align="right" />

# private-repo-project-explorer

> Share a private repo as if it were a public repo though GitHub Pages.

<table>
    <thead>
        <tr>
            <th align="center"><strong>Contents</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <ol>
                    <li><a href="#try-it">Try it! Started</a></li>
                    <li><a href="#how-can-i-add-it-to-my-repo">How can I add it to my repo?</a></li>
                    <li><a href="#license">License</a></li>
                </ol>
            </td>
        </tr>
    </tbody>
</table>

### Try it!

-   https://brianjenkins94.github.io/private-repo-file-explorer/

or serve a local directory:

```bash
npx brianjenkins94/serve
```

#### How can I add it to my repo?

1.  Copy [index.html](https://github.com/brianjenkins94/private-repo-project-explorer/blob/main/index.html) to your [GitHub Pages source folder](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
2.  Run something like:

    ```bash
    find . -type f -not -path "./.git/**" -not -path "./node_modules/**" > tree.txt
    ```

That's it!

### License

`private-repo-project-explorer` is licensed under the [MIT License](https://github.com/brianjenkins94/private-repo-project-explorer/blob/main/LICENSE).

All files located in the `node_modules` directory are externally maintained libraries used by this software which have their own licenses; it is recommend that you read them, as their terms may differ from the terms in the MIT License.
