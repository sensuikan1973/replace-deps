# replace-deps
replace dependencies in specific extension all files.

This is typically used to update JS dependencies in HTML, included using a `<script>` tag.  
result image:
![image](https://user-images.githubusercontent.com/23427957/84658170-6f6ed380-af50-11ea-98c6-caa662f0e512.png)

inspired by [GCP/repository-gardener](https://github.com/GoogleCloudPlatform/repository-gardener/blob/master/use-latest-deps-html.sh).

## example
### create PR cron to update firebase js sdk in all html files
```.yaml
on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  update_deps_sample:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          ref: master
      - name: fetch latest version
        run: echo '::set-env LATEST_VERSION=$(npm show firebase version)'
      - name: use latest firebase js sdk in all html files
        uses: sensuikan1973/replace-deps@v1
        with:
          extension: 'html'
          regex: 'firebasejs/[0-9]*\.[0-9]*\.[0-9]*/'
          replacement: "firebasejs/${{ env.LATEST_VERSION }}/"
      - name: create PR
        uses: peter-evans/create-pull-request@v2
        with:
          branch: cron_update_firebase_js_sdk_in_html
          base: master
          token: ${{ secrets.XXX_TOKEN }}
```

---

## development

### versioning
https://github.com/actions/toolkit/blob/master/docs/action-versioning.md#recommendations
