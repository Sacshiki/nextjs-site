nvmsetup = . ${NVM_DIR}/nvm.sh && nvm use --delete-prefix v14.15.5

install :
	${nvmsetup} && yarn install
run:
	${nvmsetup} && yarn dev
