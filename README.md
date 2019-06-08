<div align="center">
  <h1>
    <br/>
    <br/>
    A/B
    <br/>
    use-experiment
    <br />
    <br />
  </h1>
  <sup>
    <br />
    <br />
    <a href="https://www.npmjs.com/package/use-experiment">
      <img src="https://img.shields.io/npm/v/use-experiment.svg" alt="npm package" />
    </a>
    <a href="https://circleci.com/gh/ju1i4n/use-experiment">
      <img src="https://img.shields.io/circleci/project/ju1i4n/use-experiment/master.svg" alt="CircleCI master" />
    </a>
    <a href="https://codecov.io/gh/ju1i4n/use-experiment">
      <img src="https://codecov.io/gh/ju1i4n/use-experiment/branch/master/graph/badge.svg" />
    </a>
    <br />
  </sup>
  <br />
  <pre>yarn add <a href="https://yarnpkg.com/en/package/use-experiment">use-experiment</a></pre>
  <br />
</div>

<br />
<br />

### 🧪 ```useExperiment()```:

```js
const AddToCartButtonExperiment = () => {
  const experimentConfig = {
    id: "3143106098",
    name: "add-to-cart-green",
    variants: [{ name: "control", weight: 50 }, { name: "test", weight: 50 }]
  };
 
  const { variant: { name } } = useExperiment(experimentConfig)

  return (
    if (name === "control") {
       <button class="black">Add to cart</button>
    } else if (name === "test") {
       <button class="green">Add to cart</button>
    }
  )
}
```

### 🧪 ```useExperimentAsyc()``` (not implemented yet):
```js
const AddToCartButtonExperiment = () => {
  const experimentConfig = {
    id: "3143106098",
    name: "add-to-cart-green",
    fetchVariant: () => {
      // let's assume we call our experiment API that returns variant.
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // shoud return an object of { name: string, weight: number }.
          resolve({ name: "control", weight: 50 })
        }, 2000)
    })
  }
 
  const { variant: { name }, isLoading } = useExperimentAsync(experimentConfig)
  
  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    if (name === "control") {
       <button class="black">Add to cart</button>
    } else if (name === "test") {
       <button class="green">Add to cart</button>
    }
  )
}
```


<br />
<br />
<p align="center">
  <a href="./LICENSE"><strong>Unlicense</strong></a> &mdash; public domain.
</p>
