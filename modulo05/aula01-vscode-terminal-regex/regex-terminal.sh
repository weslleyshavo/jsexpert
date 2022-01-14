# a partir da pasta raiz
find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt
find . -name *.js -not -path '*node_modules**' | ipt

# volta para a pasta do modulo05
cp -r ../../modulo01/aula05-tdd-project-pt03 .

CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i {file} -e '1s/^/\'"$CONTENT"'\n/g'
# 1s -> primeira linha
# ^ -> primeira coluna
# substitui pelo $CONTENT

# muda tudo!
CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**' \
| xargs -I '{file}' sed -i {file} -e '1s/^/\'"$CONTENT"'\n/g'