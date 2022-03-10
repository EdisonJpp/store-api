export const VALIDATE_CHECKBOX_TYPE_PARAMS = `
param.id IN(:...paramIds)
AND param.parameterType = 'CHECKBOX' 
AND exists (
select option ->> 'id' 
              from jsonb_array_elements(param.options) as r(option)
              where (option ->> 'id')::int IN(:...optionIds)
)`;
