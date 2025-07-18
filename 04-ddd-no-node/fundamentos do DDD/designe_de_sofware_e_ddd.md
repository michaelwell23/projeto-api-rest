# Design de Software e DDD (Domain-Driven Design)

O DDD (Domain-Driven Design), ou Design Orientado ao Domínio, é uma abordagem para o design de software que foca em entender profundamente o negócio para criar sistemas mais alinhados com a realidade do usuário. Ele não está ligado diretamente ao código, mas sim à forma como pensamos, modelamos e organizamos o sistema a partir do domínio — ou seja, o problema real que o software está resolvendo.

Em vez de começar pelas tecnologias ou pela arquitetura, o DDD começa pelas pessoas. O primeiro passo é trabalhar junto com os `Domain Experts` (Especialistas do Domínio), que são as pessoas que realmente entendem o negócio. São elas que ajudam a construir uma `linguagem ubíqua` — um vocabulário comum entre desenvolvedores e especialistas que deve ser usado em todo o sistema, tanto nas conversas quanto no código.

O objetivo final do DDD é entregar valor ao usuário, criando um software que reflita fielmente a lógica e as regras do negócio. Para isso, usamos alguns conceitos importantes:

- `Entidades`: são objetos que possuem identidade e continuam sendo os mesmos ao longo do tempo, mesmo que seus dados mudem (por exemplo, um cliente).

- `Value Objects`: são objetos que não possuem identidade e são definidos apenas pelos seus atributos (por exemplo, uma cor ou endereço).

- `Agregados`: são conjuntos de entidades e objetos de valor que formam uma unidade de consistência. Cada agregado tem uma entidade raiz que gerencia o acesso aos outros componentes.

- `Eventos de Domínio`: representam algo importante que aconteceu no domínio, como "Pedido Confirmado" ou "Pagamento Aprovado". Eles ajudam a manter o sistema desacoplado e mais próximo da realidade do negócio.

- `Subdomínios`: o domínio pode ser dividido em partes menores, cada uma com seu propósito específico. Existem subdomínios centrais (core), de suporte e genéricos.

- `Casos de Uso`: representam as ações que o sistema realiza a partir das necessidades do usuário. Eles ajudam a organizar os fluxos e comportamentos de forma clara e orientada ao negócio.

DDD não é uma receita pronta nem um conjunto de ferramentas técnicas. É uma forma de pensar e colaborar, que aproxima o design do software da realidade do negócio e das pessoas envolvidas.
