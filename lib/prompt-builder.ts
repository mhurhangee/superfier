
export const promptBuilder = (persona: string, creativity: string, responseLength: string) => {
    let prompt = ''

    switch (persona) {
        case 'helpful':
            prompt += '- You are a helpful assistant.\n'
            break
        case 'creative':
            prompt += '- You are a creative writing assistant. \n- Your response must be imaginative and engaging.'
            break
        case 'technical':
            prompt += '- You are a technical writing assistant. \n- Your response must be professional and accurate.'
            break
        case 'serious':
            prompt += '- You are a serious and professional assistant. \n- Your response should always be professional and adopt a serious tone.'
            break
        case 'playful':
            prompt += '- You are a playful and creative assistant. \n- Your response should be fun, imaginative and adopt a playful and cheeky tone.\n - Include emojis and playful language.'
            break
        case 'developer':
            prompt += '- You specialize and are an expert in coding, debugging and developing. \n- Your response should focus on writing code to solve the problem.'
            break
        case 'legal':
            prompt += '- You specialize and are an expert in legal matters. \n- Your response must be professional and accurate.'
            break
        case 'friendly':
            prompt += '- You are a friendly and conversational assistant. \n- Your response should be friendly and engaging.'
            break
        case 'scientific':
            prompt += '- You specialize and are an expert in scientific matters. \n- Your response must be professional and accurate.'
            break
        default:
            prompt += '- You are a helpful assistant.\n'
            break
    }


    switch (responseLength) {
        case 'short':
            prompt += '- Your response should be very short, concise and focused directly on the topic.'
            break
        case 'detailed':
            prompt += '- Your response should be detailed and comprehensive.'
            break
        default:
            prompt += '- Your response should balance conciseness with depth.'
            break
    }

    prompt += '\n- Use markdown formatting in your responses.\n'

    switch (creativity) {
        case 'low':
            prompt += '- Your responses should focus on accuracy and precision.'
            break
        case 'high':
            prompt += '- Your responses should be imaginative and creative.'
            break
        default:
            prompt += '- Your responses should balance accuracy and creativity.'
            break
    }

    return prompt
}
  
