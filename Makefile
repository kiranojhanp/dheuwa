tag = 0
version = 0.1

.PHONY: test

build:
	@printf "\033[0;32m>>> Building\033[0m\n"
	pnpm build

dev: run

install:
	@printf "\033[0;32m>>> Installing dependencies\033[0m\n"
	pnpm install

lint:
	@printf "\033[0;32m>>> Lint code\033[0m\n"
	pnpm lint

lint.fix:
	@printf "\033[0;32m>>> Lint code\033[0m\n"
	pnpm lint:fix

release:
	@printf "\033[0;32m>>> Tagging repo for next release\033[0m\n"
	git checkout $(version)
	git pull origin $(version)
	git tag $(version).$(tag)
	git push origin $(version).$(tag)
	git checkout $(version)-develop

run:
	@printf "\033[0;32m>>> Running all apps in parallel\033[0m\n"
	pnpm start:dev

sort-package:
	@printf "\033[0;32m>>> Format package.json\033[0m\n"
	pnpm sort-package

staging:
	@printf "\033[0;32m>>> Merging into staging branch\033[0m\n"
	git checkout $(version)-develop
	git pull origin $(version)-develop
	git checkout $(version)
	git pull origin $(version)
	git merge $(version)-develop -m "Merging $(version)-develop"
	git push origin $(version)
	git checkout $(version)-develop

test:
	@printf "\033[0;32m>>> Running tests\033[0m\n"
	pnpm test

typecheck:
	@printf "\033[0;32m>>> Running Type check\033[0m\n"
	pnpm typecheck

version.update:
	@printf "\033[0;32m>>> Updating API version to ${version}.${tag}\033[0m\n"
	export VERSION=${version}.${tag} || set VERSION=${version}.${tag} && npx ts-node scripts/update-version.ts
