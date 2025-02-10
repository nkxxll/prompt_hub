export interface PromptPattern  {
  name: string,
  formatString: string,
  notes: string,
  llmWebsite: string,
  category: string,
  usageCount: number,
  public: boolean,
  userId: number,
  createdAt: Date,
  udatedAt: Date,
}

export interface UpdatePattern {
  name: string,
  formatString: string,
  notes: string,
  llmWebsite: string,
  category: string,
  usageCount: number,
  public: boolean,
  udatedAt: Date,
}
