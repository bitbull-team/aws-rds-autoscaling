include credentials
include environment

.PHONY: deploy invoke logs

deploy:
	@echo "Running serverless deploy"
	serverless deploy --aws-profile $(AWS_PROFILE)

# usage: make invoke func="test"
invoke:
	@echo "Running serverless invoke local"
	serverless invoke --function $(func)

# usage: make logs func="test"
logs:
	@echo "Running serverless logs ${AWS_PROFILE}"
	serverless logs -f $(func) -t
