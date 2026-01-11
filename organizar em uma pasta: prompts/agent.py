import os
import google.generativeai as genai
from pathlib import Path

# CONFIGURAÇÃO DE SEGURANÇA E AMBIENTE
# O agente busca a chave de API nas variáveis de ambiente para segurança
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

def load_system_instruction():
    """
    Carrega o 'Cérebro' do Agente (System Instruction) do arquivo Markdown.
    Isso garante que a Persona CodeGuardian seja mantida.
    """
    try:
        # Caminho relativo para o arquivo que você salvou na pasta prompts
        instruction_path = Path("prompts/code-guardian.md")
        with open(instruction_path, "r", encoding="utf-8") as file:
            return file.read()
    except FileNotFoundError:
        return "ERRO CRÍTICO: System Instruction 'code-guardian.md' não encontrada."

def analyze_code(code_snippet):
    """
    Função principal que envia o código para o Gemini processar
    seguindo as regras do CodeGuardian.
    """
    if not GOOGLE_API_KEY:
        return "ERRO: API Key não configurada. Defina GOOGLE_API_KEY no ambiente."

    # Configuração da API
    genai.configure(api_key=GOOGLE_API_KEY)

    # Carrega a 'Consciência' do Agente
    system_instruction = load_system_instruction()

    # Inicializa o modelo Gemini 1.5 Pro (Janela de Contexto Longa)
    # Temperature 0.2 para ser mais determinístico e menos criativo (foco em engenharia)
    model = genai.GenerativeModel(
        model_name="gemini-1.5-pro-latest",
        system_instruction=system_instruction,
        generation_config={"temperature": 0.2}
    )

    print(f"🤖 CodeGuardian-Alpha analisando snippet de {len(code_snippet)} caracteres...")
    
    # Executa a análise (Grounding no código fornecido)
    response = model.generate_content(code_snippet)
    
    return response.text

# BLOCO DE TESTE LOCAL
# Isso permite testar o agente se rodar o script diretamente
if __name__ == "__main__":
    # Exemplo de código 'sujo' para teste
    codigo_teste = """
    def conectar_banco(usuario):
        sql = "SELECT * FROM contas WHERE user = " + usuario
        executar(sql)
    """
    
    resultado = analyze_code(codigo_teste)
    print("\n" + "="*40)
    print("RELATÓRIO DO AGENTE:")
    print("="*40 + "\n")
    print(resultado)
