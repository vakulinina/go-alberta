# Git Usage Guidelines 

This document outlines how our team will use **Git** following the **Git-flow** branching strategy. These guidelines ensure a structured development workflow, maintain a clean commit history, and prevent conflicts in production code.

---

## **Branching Model**

### Main Branches

1. **`main`**:
    - Contains the production-ready code.
    - Only updated via merges from `release` branches.
    - Direct commits are **not allowed**.
2. **`develop`**:
    - Contains the latest stable code under development.
    - Merges from `feature` branches after they are completed and reviewed.

---

### Supporting Branches

1. **Feature Branches (`feature/*`)**:
    - Used to develop new features.
    - Created from: `develop`.
    - Merged into: `develop`.
    - Naming convention: `feature/<feature-name`>.
2. **Release Branches (`release/*`)**:
    - Used to prepare a new production release.
    - Created from: `develop`.
    - Merged into: `main` and `develop`.
    - Naming convention: `release/vX.X`.

---

## **How to Use Git in Our Workflow**

### 1. **Cloning the Repository**

To get started, clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

---

### 2. **Starting Development**

### Creating a Feature Branch

1. Switch to the `develop` branch:
    
    ```
    git checkout develop
    ```
    
2. Create a new feature branch:
    
    ```bash
    git checkout -b feature/<feature-name>
    ```
    
3. Push the branch to the remote repository:
    
    ```bash
    git push -u origin feature/<feature-name>
    ```
    

### Working on the Feature

1. Commit your changes frequently:
    
    ```bash
    git add .
    git commit -m "<type>: brief description of the changes"
    ```
    
2. Sync with the latest `develop` branch regularly:
    
    ```bash
    git pull origin develop
    ```
    

---

### 3. **Finishing Development**

### Merging a Feature Branch

1. Push your final changes:
    
    ```bash
    git push
    ```
    
2. Create a **Pull Request (PR)** from `feature/feature-name` to `develop` in GitHub.
3. Ensure all reviewers approve the PR.
4. Once approved and checks pass, merge the PR into `develop` using **squash and merge** (to maintain a clean commit history).

---

### 4. **Preparing for a Release**

### Creating a Release Branch

1. Create a release branch from `develop`:
    
    ```bash
    git checkout -b release/vX.X
    git push -u origin release/vX.X
    ```
    
2. Perform final testing and fix minor issues in this branch.

### Merging a Release Branch

1. Merge the release branch into `main` and tag the release:
    
    ```bash
    git checkout main
    git merge release/vX.X
    git tag vX.X
    git push origin main --tags
    ```
    
2. Merge the release branch back into `develop`:
    
    ```bash
    git checkout develop
    git merge release/vX.X
    ```
    
3. Delete the release branch (optional):
    
    ```bash
    git branch -d release/vX.X
    git push origin --delete release/vX.X
    ```
    

---

## **Branch Protection Rules**

### `main` and `develop` Restrictions

1. **Direct Commits**: Disabled for all users.
2. **Pull Requests Required**: All changes must go through a PR with:
    - At least one reviewer approval.
    - Passing CI checks (TBD).
3. **Branch Updates**: The branch must be up to date with its base branch before merging.

---

## **Commit Guidelines**

### Use Conventional Commits

We follow the [**Conventional Commits**](https://www.conventionalcommits.org/) specification for commit messages. This ensures consistent, meaningful messages that improve readability and facilitate automation.

### **Commit Message Format**

```
<type>[optional scope]: <description>

[optional body]
```

### **Commit Types**

- **feat**: A new feature.
- **fix**: A bug fix.
- **docs**: Documentation changes only.
- **style**: Code style changes (formatting, no code change).
- **refactor**: Code changes that neither fix a bug nor add a feature.
- **test**: Adding or updating tests.
- **chore**: Changes to build process, tools, or dependencies.

### **Examples**

- `feat(auth): add JWT authentication`
- `fix(profile): resolve crash on user photo upload`
- `docs: update README with setup instructions`

### Additional Notes

- Use the **imperative mood** (e.g., "add" instead of "added" or "adds").
- Keep the description concise (preferably under 50 characters).
- Include a detailed body if necessary, explaining *what* and *why* (not *how*).

---

## **Pull Request Guidelines**

1. Create a PR with a descriptive title and summary.
2. Assign at least one reviewer.
3. Address reviewer feedback promptly.
4. Ensure all checks pass before merging.

---

## **Best Practices**

1. **Keep Branches Small**: Limit the scope of feature branches to avoid conflicts.
2. **Sync Regularly**: Rebase your branch on `develop` frequently.
3. **Collaborate**: Discuss significant changes with the team early.
4. **Avoid Force Pushes**: Except for rebasing your own branch locally.