import{u as k,f as m,r as p,o as g,a as n,c as l,d as v,w as f,v as h,b as a,s as c}from"./index-48785d9d.js";const b={key:0,class:"task-details"},y=["src"],T={key:1},w=a("p",null,"Loading task...",-1),V=[w],q={__name:"EditTaskView",setup(x){const u=k(),o=m().params.taskId;console.log("Task ID:",o);const s=p(null),i=t=>"https://oerpddeqepyvfzuecggs.supabase.co/storage/v1/object/public/echoimages/"+t;g(async()=>{const{data:t,error:e}=await c.from("tasks").select("*").eq("id",o).single();console.log("Fetched data:",t),console.log("Fetch error:",e),e?console.error("Error fetching task:",e):s.value=t});const r=()=>{u.push({name:"secret"})},d=async()=>{const{data:t,error:e}=await c.from("tasks").update({name:s.value.name,image_url:s.value.image_url}).eq("id",o);e?console.error("Error updating task:",e):(console.log("Task updated successfully:",t),r())};return(t,e)=>s.value?(n(),l("div",b,[s.value.image_url?(n(),l("img",{key:0,src:i(s.value.image_url),alt:"Task Image",class:"task-image"},null,8,y)):v("",!0),f(a("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=_=>s.value.name=_),class:"task-input"},null,512),[[h,s.value.name]]),a("div",{class:"button-container"},[a("button",{class:"rounded-button",onClick:d},"Save Changes"),a("button",{class:"rounded-button",onClick:r},"Cancel")])])):(n(),l("div",T,V))}};export{q as default};
