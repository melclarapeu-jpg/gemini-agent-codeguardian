
import os
import google.generativeai as genai

# 1. Configuração da Segurança
# Pega a chave que está guardada nos Secrets do GitHub
if "GOOGLE_API_KEY" not in os.environ:
    print("ERRO CRÍTICO: GOOGLE_API_KEY não encontrada no ambiente.")
    exit(1)

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# 2. O CÉREBRO (System Instruction)
# Aqui está a "persona" que define o comportamento do Agente Guardião.
# [cite_start]Baseado nas melhores práticas de Engenharia de Prompts[cite: 112, 119].
SYSTEM_INSTRUCTION = """
# SYSTEM INSTRUCTION

## IDENTIDADE
Nome: CodeGuardian-Alpha
Função: Senior Code Auditor
Tom: Técnico, Crítico, Construtivo, Sem Emoção.

## OBJETIVO PRIMÁRIO
Analisar diffs de código em busca de falhas de segurança (OWASP Top 10), débitos técnicos e violações de estilo.

## DIRETRIZES OPERACIONAIS
1. [cite_start]**Raciocínio Lógico (CoT):** Pense passo a passo. Identifique a intenção do código antes de julgar a sintaxe[cite: 63].
2. [cite_start]**Grounding:** Se o código parecer incompleto, aponte o risco mas não alucine variáveis que não existem[cite: 123].
3. **Segurança Extrema:** Procure ativamente por SQL Injection, Hardcoded Secrets e XSS.

## FORMATO DE SAÍDA (Obrigatório)
Responda APENAS com um JSON válido seguindo este schema:
{
  "verdict": "APPROVE" | "REJECT",
  "critical_issues": ["lista de falhas graves"],
  "reasoning": "Explicação técnica breve do porquê."
}
"""

# 3. O CENÁRIO DE TESTE (Simulação)
# Como estamos testando manualmente, vamos forçar o agente a analisar este código HORRÍVEL abaixo.
# (Este código tem SQL Injection proposital para ver se o agente pega).
CODIGO_PARA_ANALISE = """
def get_user_data(username):
    # TODO: Fix security later
    query = "SELECT * FROM users WHERE name = '" + username + "'"
    return db.execute(query)
"""

# 4. A EXECUÇÃO DO AGENTE
def run_guardian():
    print("--- 🟢 INICIANDO O CODE GUARDIAN ---")
    
    # Inicializa o modelo com a Instrução de Sistema
    # Usamos o Gemini 1.5 Flash para velocidade ou Pro para raciocínio profundo
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash", 
        system_instruction=SYSTEM_INSTRUCTION
    )
    
    print(f"--- 🔍 ANALISANDO CÓDIGO VULNERÁVEL: ---\n{CODIGO_PARA_ANALISE}")
    
    # O Prompt do usuário é apenas o código a ser analisado
    response = model.generate_content(f"Analise este código:\n{CODIGO_PARA_ANALISE}")
    
    print("--- 🧠 RACIOCÍNIO DO AGENTE (SAÍDA JSON): ---")
    # AQUI ESTÁ A VOZ: O print faz aparecer no log do GitHub
    print(response.text) 
    print("---------------------------------------------")

if __name__ == "__main__":
    run_guardian()
