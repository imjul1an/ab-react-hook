<div align="center">
  <h1>
    <br/>
    <br/>
    A/B
    <br/>
    Experiment Hooks
    <br />
    <br />
  </h1>
  <sup>
    <br />
    <br />
    <a href="https://www.npmjs.com/package/ab-react-hook">
      <img src="https://img.shields.io/npm/v/ab-react-hook.svg" alt="npm package" />
    </a>
    <a href="https://circleci.com/gh/ju1i4n/ab-react-hook">
      <img src="https://img.shields.io/circleci/project/ju1i4n/ab-react-hook/master.svg" alt="CircleCI master" />
    </a>
    <a href="https://codecov.io/gh/ju1i4n/ab-react-hook">
      <img src="https://codecov.io/gh/ju1i4n/ab-react-hook/branch/master/graph/badge.svg" />
    </a>
    <br />
  </sup>
  <br />
  <br />
</div>
<br />
<br />

## Install

Using npm:

```sh
npm i ab-react-hook
```

or using yarn:

```sh
yarn add ab-react-hook
```


## ```useExperiment()```

1. Define experiment varaiants and weights: `variants: [{ name: "control", weight: 50 }, { name: "test", weight: 50 }]`
2. Get the variant and send it to your analytics (google analytics, facebook analytics etc.), so you can aggregate results when running an experiment.


```js
const AddToCartButtonExperiment = () => {
  const experimentConfig = {
    id: "3143106091",
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

## ```useExperimentAsyc()```

1. It assumes that you get a variant from your experiment service. Use `fetchVariant` and pass the api call there. It must return a result in the following form: `{ name: "control", weight: 50 }`. 
2. Depending on your implementation, send the received variant back to the experiemnt service.

```js
const AddToCartButtonExperiment = () => {
  const experimentConfig = {
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
