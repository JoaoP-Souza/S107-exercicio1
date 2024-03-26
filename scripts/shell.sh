#!/bin/bash

# Listar arquivos no diretório
ls

# Imprimir "Olá mundo"
echo "Olá mundo"

# Instalar o utilitário de e-mail (mailutils)
sudo apt-get install -y mailutils

# Imprimir "Fim da instalação"
echo "Fim da instalação"

# Enviar um e-mail
echo "git socorro" | mail -s "Assunto" $EMAIL

