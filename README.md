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


## When should I use A/B tests?

It's a very good question to ask before start doing A/B tests. The simple answer would be - when the **sample size is statistically significant** and you have a **good traffic**. To dig deeper into numbers use [powercalculator](https://bookingcom.github.io/powercalculator/) made by [booking](https://bookingcom.github.io) to understand **how long would** it take you to run an A/B test and get a statistically significant result.


## ```useExperiment()``` [![][img-demo]](https://codesandbox.io/embed/ab-react-hook-playground-4crjn)


- Define experiment variants and weights:
```
variants: [{
  name: "control", weight: 50 
}, {
  name: "test", weight: 50
}]
```
You can define *as many variants as you want* but it is recommended to keep **two** or max **three** variants for your experiment.
- Get the variant and send it to your analytics (_google analytics_, _facebook analytics_ etc.), so you can **aggregate results in a single place and analyze it later**.


```js
const AddToCartButtonExperiment = () => {
  const experimentConfig = {
    id: "3143106091",
    name: "add-to-cart-green",
    variants: [{ name: "control", weight: 50 }, { name: "test", weight: 50 }]
  };
 
  const { variant: { name } } = useExperiment(experimentConfig)

  if (name === "control") {
     return <button class="black">Add to cart</button>;
  } else if (name === "test") {
     return <button class="green">Add to cart</button>;
  }
}
```

## ```useExperimentAsync()```

- It assumes that you get a variant from your experiment service. Use `fetchVariant` and pass the api call there. It must return a result in the following form: `{ name: "control", weight: 50 }`. 
- Depending on your implementation, send the received variant back to the experiment service.

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

  if (name === "control") {
    return <button class="black">Add to cart</button>;
  } else if (name === "test") {
    return <button class="green">Add to cart</button>;
  }
}
```

[img-demo]: https://img.shields.io/badge/demo-%20%20%20%F0%9F%9A%80-green.svg
