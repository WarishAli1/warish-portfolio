const blogs = [
  {
    id: "ml-classification",
    title: "Neural Network Classification",
    date: "2025-10-29",
    description: "See how neural networks transform raw data into accurate classifications.",
    content: `
# Introduction

When I first started learning Machine Learning (ML) and Deep Learning, one of the first things I explored was classification models.

Classification is about teaching a model to categorize things — for example, identifying whether an image shows a dog or cat, or deciding whether an email is spam or not spam.

I quickly learned that there are two main types of classification:

- **Binary Classification** – when there are only two classes.
- **Multi-Class Classification** – when there are more than two classes.

## Binary Classification

Binary classification means the model predicts between two outcomes, like:

- Dog or Cat  
- Spam or Not Spam  
- 0 or 1

### Dataset for Binary Classification

I used the **make_circles()** dataset, which creates two concentric circles making a non-linearly separable problem — perfect for learning classification.

\`\`\`python
from sklearn.datasets import make_circles

X, y = make_circles(n_samples=1000, noise=0.03, random_state=42)
\`\`\`

### Binary Model: CircleModelV2

Here is a simple neural network for binary classification using PyTorch:

\`\`\`python
import torch
from torch import nn

class CircleModelV2(nn.Module):
    def __init__(self):
        super().__init__()
        self.layer_1 = nn.Linear(2, 10)
        self.relu = nn.ReLU()
        self.layer_2 = nn.Linear(10, 10)
        self.layer_3 = nn.Linear(10, 1)

    def forward(self, x):
        z = self.layer_1(x)
        z = self.relu(z)
        z = self.layer_2(z)
        z = self.relu(z)
        z = self.layer_3(z)
        return z
\`\`\`

### Training the Binary Model

You can train the model with a binary cross-entropy loss combined with a sigmoid activation, using **BCEWithLogitsLoss** which integrates both for numerical stability:

\`\`\`python
loss_fn = nn.BCEWithLogitsLoss()
optimizer = torch.optim.SGD(params=model_0.parameters(), lr=0.1)
\`\`\`

### Training Loop for Binary Classification

\`\`\`python
epochs = 1000
for epoch in range(epochs):
    model_0.train()
    y_logits = model_0(X_train)
    y_pred = torch.sigmoid(y_logits)
    loss = loss_fn(y_logits, y_train)

    optimizer.zero_grad()        # clear previous gradients
    loss.backward()              # compute gradients
    optimizer.step()             # update parameters

    if epoch % 100 == 0:
        print(f"Epoch {epoch}: Loss = {loss.item():.4f}")
\`\`\`



The **sigmoid activation** is applied in the final layer because it squashes the output logits to a range between **0 and 1**, which represents the probability of belonging to the positive class (e.g., 1 = "dog").  

This makes it ideal for **binary classification**, where the output represents a single probability value.

Here, **loss.backward()** computes the gradients for all model parameters, and **optimizer.step()** updates them in the direction that **reduces the loss**. We can think of it as being at the top of a hill, where the slope represents the gradient, and we take small steps downward to reach the lowest point (minimum loss).

We use **optimizer.zero_grad()** before each backward pass to **reset gradients** from the previous iteration — otherwise, they would **accumulate**, leading to incorrect parameter updates.

---

## Multi-Class Classification

Multi-class classification predicts one class out of several possible categories, such as:

- Dog , Cat , Cow

### Dataset for Multi-Class

Using **make_blobs()**, we can generate clusters representing different classes:

\`\`\`python
from sklearn.datasets import make_blobs
from sklearn.model_selection import train_test_split
import torch

NUM_CLASSES = 4
NUM_FEATURES = 2
RANDOM_SEED = 42

X_blob, y_blob = make_blobs(
    n_samples=1000,
    n_features=NUM_FEATURES,
    centers=NUM_CLASSES,
    cluster_std=1.5,
    random_state=RANDOM_SEED
)
\`\`\`

### Multi-Class Model: BlobModel

\`\`\`python
class BlobModel(nn.Module):
    def __init__(self, input_features, output_features, hidden_units=8):
        super().__init__()
        self.linear_layer_stack = nn.Sequential(
            nn.Linear(input_features, hidden_units),
            nn.ReLU(),
            nn.Linear(hidden_units, 16),
            nn.ReLU(),
            nn.Linear(16, hidden_units),
            nn.ReLU(),
            nn.Linear(hidden_units, 16),
            nn.ReLU(),
            nn.Linear(16, output_features)
        )

    def forward(self, x):
        return self.linear_layer_stack(x)
\`\`\`

### Training Loop for Multi-Class Classification

\`\`\`python
loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(params=model_1.parameters(), lr=0.01)

epochs = 1000
for epoch in range(epochs):
    model_1.train()
    y_logits = model_1(X_train)
    loss = loss_fn(y_logits, y_train)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    if epoch % 100 == 0:
        print(f"Epoch {epoch}: Loss = {loss.item():.4f}")
\`\`\`

In **multi-class classification**, the model’s final layer outputs **raw scores (logits)** for each class.

The **softmax** function converts these logits into a **probability distribution** that sums to 1, indicating the likelihood of each class.

We don’t apply softmax manually because **nn.CrossEntropyLoss()** already applies it internally for efficiency and numerical stability.

Just like before, **loss.backward()** computes the gradients for all model parameters, and **optimizer.step()** updates them in the direction that **reduces the loss**.

---

## Key Concepts I Learned

- Binary Classification deals with two distinct classes, Multi-Class Classification involves more than two. 
- A sigmoid function converts logits (raw model outputs) into probabilities between 0 and 1 for binary classification. 
- Softmax converts logits into a probability distribution over multiple classes for multi-class problems. 
- ReLU (Rectified Linear Unit) adds non-linearity enabling neural networks to learn complex functions.
- Gradient Descent is the optimization method where loss.backward() computes gradients and optimizer.step() updates model parameters.
- For multi-class classification in PyTorch, use nn.CrossEntropyLoss() which combines softmax and negative log likelihood internally.
- optimizer.zero_grad() is used to clear old gradients before each backward pass, preventing unwanted accumulation.

---

## Conclusion

Classification is a fundamental task in machine learning that enables models to categorize data into classes. Understanding the differences between binary and multi-class classification helps in selecting the right approach and architecture. Neural networks, combined with activation functions like ReLU, sigmoid, and softmax, provide powerful tools for tackling complex classification problems. Applying the right loss functions and optimization techniques contributes significantly to building effective models. Continuous experimentation and learning are key to mastering classification tasks in ML and Deep Learning.
`
  }
];
export default blogs;
