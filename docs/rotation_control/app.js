!function(n){var t={};function r(u){if(t[u])return t[u].exports;var e=t[u]={i:u,l:!1,exports:{}};return n[u].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=n,r.c=t,r.d=function(n,t,u){r.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:u})},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.t=function(n,t){if(1&t&&(n=r(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var u=Object.create(null);if(r.r(u),Object.defineProperty(u,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var e in n)r.d(u,e,function(t){return n[t]}.bind(null,e));return u},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="/",r(r.s=85)}({0:function(n,t,r){"use strict";var u={};r.r(u),r.d(u,"create",function(){return d}),r.d(u,"clone",function(){return h}),r.d(u,"copy",function(){return s}),r.d(u,"fromValues",function(){return M}),r.d(u,"set",function(){return l}),r.d(u,"identity",function(){return v}),r.d(u,"transpose",function(){return m}),r.d(u,"invert",function(){return b}),r.d(u,"adjoint",function(){return g}),r.d(u,"determinant",function(){return p}),r.d(u,"multiply",function(){return x}),r.d(u,"translate",function(){return w}),r.d(u,"scale",function(){return y}),r.d(u,"rotate",function(){return q}),r.d(u,"rotateX",function(){return A}),r.d(u,"rotateY",function(){return P}),r.d(u,"rotateZ",function(){return S}),r.d(u,"fromTranslation",function(){return I}),r.d(u,"fromScaling",function(){return E}),r.d(u,"fromRotation",function(){return T}),r.d(u,"fromXRotation",function(){return L}),r.d(u,"fromYRotation",function(){return R}),r.d(u,"fromZRotation",function(){return _}),r.d(u,"fromRotationTranslation",function(){return F}),r.d(u,"fromQuat2",function(){return O}),r.d(u,"getTranslation",function(){return D}),r.d(u,"getScaling",function(){return V}),r.d(u,"getRotation",function(){return B}),r.d(u,"fromRotationTranslationScale",function(){return j}),r.d(u,"fromRotationTranslationScaleOrigin",function(){return C}),r.d(u,"fromQuat",function(){return k}),r.d(u,"frustum",function(){return U}),r.d(u,"perspective",function(){return z}),r.d(u,"perspectiveFromFieldOfView",function(){return G}),r.d(u,"ortho",function(){return W}),r.d(u,"lookAt",function(){return Y}),r.d(u,"targetTo",function(){return H}),r.d(u,"str",function(){return N}),r.d(u,"frob",function(){return Q}),r.d(u,"add",function(){return X}),r.d(u,"subtract",function(){return Z}),r.d(u,"multiplyScalar",function(){return K}),r.d(u,"multiplyScalarAndAdd",function(){return J}),r.d(u,"exactEquals",function(){return $}),r.d(u,"equals",function(){return nn}),r.d(u,"mul",function(){return tn}),r.d(u,"sub",function(){return rn});var e={};r.r(e),r.d(e,"create",function(){return un}),r.d(e,"clone",function(){return en}),r.d(e,"fromValues",function(){return an}),r.d(e,"copy",function(){return on}),r.d(e,"set",function(){return cn}),r.d(e,"add",function(){return fn}),r.d(e,"subtract",function(){return dn}),r.d(e,"multiply",function(){return hn}),r.d(e,"divide",function(){return sn}),r.d(e,"ceil",function(){return Mn}),r.d(e,"floor",function(){return ln}),r.d(e,"min",function(){return vn}),r.d(e,"max",function(){return mn}),r.d(e,"round",function(){return bn}),r.d(e,"scale",function(){return gn}),r.d(e,"scaleAndAdd",function(){return pn}),r.d(e,"distance",function(){return xn}),r.d(e,"squaredDistance",function(){return wn}),r.d(e,"length",function(){return yn}),r.d(e,"squaredLength",function(){return qn}),r.d(e,"negate",function(){return An}),r.d(e,"inverse",function(){return Pn}),r.d(e,"normalize",function(){return Sn}),r.d(e,"dot",function(){return In}),r.d(e,"cross",function(){return En}),r.d(e,"lerp",function(){return Tn}),r.d(e,"random",function(){return Ln}),r.d(e,"transformMat2",function(){return Rn}),r.d(e,"transformMat2d",function(){return _n}),r.d(e,"transformMat3",function(){return Fn}),r.d(e,"transformMat4",function(){return On}),r.d(e,"rotate",function(){return Dn}),r.d(e,"angle",function(){return Vn}),r.d(e,"zero",function(){return Bn}),r.d(e,"str",function(){return jn}),r.d(e,"exactEquals",function(){return Cn}),r.d(e,"equals",function(){return kn}),r.d(e,"len",function(){return zn}),r.d(e,"sub",function(){return Gn}),r.d(e,"mul",function(){return Wn}),r.d(e,"div",function(){return Yn}),r.d(e,"dist",function(){return Hn}),r.d(e,"sqrDist",function(){return Nn}),r.d(e,"sqrLen",function(){return Qn}),r.d(e,"forEach",function(){return Xn});var a={};r.r(a),r.d(a,"create",function(){return Zn}),r.d(a,"clone",function(){return Kn}),r.d(a,"length",function(){return Jn}),r.d(a,"fromValues",function(){return $n}),r.d(a,"copy",function(){return nt}),r.d(a,"set",function(){return tt}),r.d(a,"add",function(){return rt}),r.d(a,"subtract",function(){return ut}),r.d(a,"multiply",function(){return et}),r.d(a,"divide",function(){return at}),r.d(a,"ceil",function(){return ot}),r.d(a,"floor",function(){return it}),r.d(a,"min",function(){return ct}),r.d(a,"max",function(){return ft}),r.d(a,"round",function(){return dt}),r.d(a,"scale",function(){return ht}),r.d(a,"scaleAndAdd",function(){return st}),r.d(a,"distance",function(){return Mt}),r.d(a,"squaredDistance",function(){return lt}),r.d(a,"squaredLength",function(){return vt}),r.d(a,"negate",function(){return mt}),r.d(a,"inverse",function(){return bt}),r.d(a,"normalize",function(){return gt}),r.d(a,"dot",function(){return pt}),r.d(a,"cross",function(){return xt}),r.d(a,"lerp",function(){return wt}),r.d(a,"hermite",function(){return yt}),r.d(a,"bezier",function(){return qt}),r.d(a,"random",function(){return At}),r.d(a,"transformMat4",function(){return Pt}),r.d(a,"transformMat3",function(){return St}),r.d(a,"transformQuat",function(){return It}),r.d(a,"rotateX",function(){return Et}),r.d(a,"rotateY",function(){return Tt}),r.d(a,"rotateZ",function(){return Lt}),r.d(a,"angle",function(){return Rt}),r.d(a,"zero",function(){return _t}),r.d(a,"str",function(){return Ft}),r.d(a,"exactEquals",function(){return Ot}),r.d(a,"equals",function(){return Dt}),r.d(a,"sub",function(){return Vt}),r.d(a,"mul",function(){return Bt}),r.d(a,"div",function(){return jt}),r.d(a,"dist",function(){return Ct}),r.d(a,"sqrDist",function(){return kt}),r.d(a,"len",function(){return Ut}),r.d(a,"sqrLen",function(){return zt}),r.d(a,"forEach",function(){return Gt});var o={};r.r(o),r.d(o,"create",function(){return Wt}),r.d(o,"clone",function(){return Yt}),r.d(o,"fromValues",function(){return Ht}),r.d(o,"copy",function(){return Nt}),r.d(o,"set",function(){return Qt}),r.d(o,"add",function(){return Xt}),r.d(o,"subtract",function(){return Zt}),r.d(o,"multiply",function(){return Kt}),r.d(o,"divide",function(){return Jt}),r.d(o,"ceil",function(){return $t}),r.d(o,"floor",function(){return nr}),r.d(o,"min",function(){return tr}),r.d(o,"max",function(){return rr}),r.d(o,"round",function(){return ur}),r.d(o,"scale",function(){return er}),r.d(o,"scaleAndAdd",function(){return ar}),r.d(o,"distance",function(){return or}),r.d(o,"squaredDistance",function(){return ir}),r.d(o,"length",function(){return cr}),r.d(o,"squaredLength",function(){return fr}),r.d(o,"negate",function(){return dr}),r.d(o,"inverse",function(){return hr}),r.d(o,"normalize",function(){return sr}),r.d(o,"dot",function(){return Mr}),r.d(o,"cross",function(){return lr}),r.d(o,"lerp",function(){return vr}),r.d(o,"random",function(){return mr}),r.d(o,"transformMat4",function(){return br}),r.d(o,"transformQuat",function(){return gr}),r.d(o,"zero",function(){return pr}),r.d(o,"str",function(){return xr}),r.d(o,"exactEquals",function(){return wr}),r.d(o,"equals",function(){return yr}),r.d(o,"sub",function(){return qr}),r.d(o,"mul",function(){return Ar}),r.d(o,"div",function(){return Pr}),r.d(o,"dist",function(){return Sr}),r.d(o,"sqrDist",function(){return Ir}),r.d(o,"len",function(){return Er}),r.d(o,"sqrLen",function(){return Tr}),r.d(o,"forEach",function(){return Lr});var i=1e-6,c="undefined"!=typeof Float32Array?Float32Array:Array,f=Math.random;Math.PI;function d(){var n=new c(16);return c!=Float32Array&&(n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0),n[0]=1,n[5]=1,n[10]=1,n[15]=1,n}function h(n){var t=new c(16);return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t}function s(n,t){return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n}function M(n,t,r,u,e,a,o,i,f,d,h,s,M,l,v,m){var b=new c(16);return b[0]=n,b[1]=t,b[2]=r,b[3]=u,b[4]=e,b[5]=a,b[6]=o,b[7]=i,b[8]=f,b[9]=d,b[10]=h,b[11]=s,b[12]=M,b[13]=l,b[14]=v,b[15]=m,b}function l(n,t,r,u,e,a,o,i,c,f,d,h,s,M,l,v,m){return n[0]=t,n[1]=r,n[2]=u,n[3]=e,n[4]=a,n[5]=o,n[6]=i,n[7]=c,n[8]=f,n[9]=d,n[10]=h,n[11]=s,n[12]=M,n[13]=l,n[14]=v,n[15]=m,n}function v(n){return n[0]=1,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=1,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=1,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function m(n,t){if(n===t){var r=t[1],u=t[2],e=t[3],a=t[6],o=t[7],i=t[11];n[1]=t[4],n[2]=t[8],n[3]=t[12],n[4]=r,n[6]=t[9],n[7]=t[13],n[8]=u,n[9]=a,n[11]=t[14],n[12]=e,n[13]=o,n[14]=i}else n[0]=t[0],n[1]=t[4],n[2]=t[8],n[3]=t[12],n[4]=t[1],n[5]=t[5],n[6]=t[9],n[7]=t[13],n[8]=t[2],n[9]=t[6],n[10]=t[10],n[11]=t[14],n[12]=t[3],n[13]=t[7],n[14]=t[11],n[15]=t[15];return n}function b(n,t){var r=t[0],u=t[1],e=t[2],a=t[3],o=t[4],i=t[5],c=t[6],f=t[7],d=t[8],h=t[9],s=t[10],M=t[11],l=t[12],v=t[13],m=t[14],b=t[15],g=r*i-u*o,p=r*c-e*o,x=r*f-a*o,w=u*c-e*i,y=u*f-a*i,q=e*f-a*c,A=d*v-h*l,P=d*m-s*l,S=d*b-M*l,I=h*m-s*v,E=h*b-M*v,T=s*b-M*m,L=g*T-p*E+x*I+w*S-y*P+q*A;return L?(L=1/L,n[0]=(i*T-c*E+f*I)*L,n[1]=(e*E-u*T-a*I)*L,n[2]=(v*q-m*y+b*w)*L,n[3]=(s*y-h*q-M*w)*L,n[4]=(c*S-o*T-f*P)*L,n[5]=(r*T-e*S+a*P)*L,n[6]=(m*x-l*q-b*p)*L,n[7]=(d*q-s*x+M*p)*L,n[8]=(o*E-i*S+f*A)*L,n[9]=(u*S-r*E-a*A)*L,n[10]=(l*y-v*x+b*g)*L,n[11]=(h*x-d*y-M*g)*L,n[12]=(i*P-o*I-c*A)*L,n[13]=(r*I-u*P+e*A)*L,n[14]=(v*p-l*w-m*g)*L,n[15]=(d*w-h*p+s*g)*L,n):null}function g(n,t){var r=t[0],u=t[1],e=t[2],a=t[3],o=t[4],i=t[5],c=t[6],f=t[7],d=t[8],h=t[9],s=t[10],M=t[11],l=t[12],v=t[13],m=t[14],b=t[15];return n[0]=i*(s*b-M*m)-h*(c*b-f*m)+v*(c*M-f*s),n[1]=-(u*(s*b-M*m)-h*(e*b-a*m)+v*(e*M-a*s)),n[2]=u*(c*b-f*m)-i*(e*b-a*m)+v*(e*f-a*c),n[3]=-(u*(c*M-f*s)-i*(e*M-a*s)+h*(e*f-a*c)),n[4]=-(o*(s*b-M*m)-d*(c*b-f*m)+l*(c*M-f*s)),n[5]=r*(s*b-M*m)-d*(e*b-a*m)+l*(e*M-a*s),n[6]=-(r*(c*b-f*m)-o*(e*b-a*m)+l*(e*f-a*c)),n[7]=r*(c*M-f*s)-o*(e*M-a*s)+d*(e*f-a*c),n[8]=o*(h*b-M*v)-d*(i*b-f*v)+l*(i*M-f*h),n[9]=-(r*(h*b-M*v)-d*(u*b-a*v)+l*(u*M-a*h)),n[10]=r*(i*b-f*v)-o*(u*b-a*v)+l*(u*f-a*i),n[11]=-(r*(i*M-f*h)-o*(u*M-a*h)+d*(u*f-a*i)),n[12]=-(o*(h*m-s*v)-d*(i*m-c*v)+l*(i*s-c*h)),n[13]=r*(h*m-s*v)-d*(u*m-e*v)+l*(u*s-e*h),n[14]=-(r*(i*m-c*v)-o*(u*m-e*v)+l*(u*c-e*i)),n[15]=r*(i*s-c*h)-o*(u*s-e*h)+d*(u*c-e*i),n}function p(n){var t=n[0],r=n[1],u=n[2],e=n[3],a=n[4],o=n[5],i=n[6],c=n[7],f=n[8],d=n[9],h=n[10],s=n[11],M=n[12],l=n[13],v=n[14],m=n[15];return(t*o-r*a)*(h*m-s*v)-(t*i-u*a)*(d*m-s*l)+(t*c-e*a)*(d*v-h*l)+(r*i-u*o)*(f*m-s*M)-(r*c-e*o)*(f*v-h*M)+(u*c-e*i)*(f*l-d*M)}function x(n,t,r){var u=t[0],e=t[1],a=t[2],o=t[3],i=t[4],c=t[5],f=t[6],d=t[7],h=t[8],s=t[9],M=t[10],l=t[11],v=t[12],m=t[13],b=t[14],g=t[15],p=r[0],x=r[1],w=r[2],y=r[3];return n[0]=p*u+x*i+w*h+y*v,n[1]=p*e+x*c+w*s+y*m,n[2]=p*a+x*f+w*M+y*b,n[3]=p*o+x*d+w*l+y*g,p=r[4],x=r[5],w=r[6],y=r[7],n[4]=p*u+x*i+w*h+y*v,n[5]=p*e+x*c+w*s+y*m,n[6]=p*a+x*f+w*M+y*b,n[7]=p*o+x*d+w*l+y*g,p=r[8],x=r[9],w=r[10],y=r[11],n[8]=p*u+x*i+w*h+y*v,n[9]=p*e+x*c+w*s+y*m,n[10]=p*a+x*f+w*M+y*b,n[11]=p*o+x*d+w*l+y*g,p=r[12],x=r[13],w=r[14],y=r[15],n[12]=p*u+x*i+w*h+y*v,n[13]=p*e+x*c+w*s+y*m,n[14]=p*a+x*f+w*M+y*b,n[15]=p*o+x*d+w*l+y*g,n}function w(n,t,r){var u,e,a,o,i,c,f,d,h,s,M,l,v=r[0],m=r[1],b=r[2];return t===n?(n[12]=t[0]*v+t[4]*m+t[8]*b+t[12],n[13]=t[1]*v+t[5]*m+t[9]*b+t[13],n[14]=t[2]*v+t[6]*m+t[10]*b+t[14],n[15]=t[3]*v+t[7]*m+t[11]*b+t[15]):(u=t[0],e=t[1],a=t[2],o=t[3],i=t[4],c=t[5],f=t[6],d=t[7],h=t[8],s=t[9],M=t[10],l=t[11],n[0]=u,n[1]=e,n[2]=a,n[3]=o,n[4]=i,n[5]=c,n[6]=f,n[7]=d,n[8]=h,n[9]=s,n[10]=M,n[11]=l,n[12]=u*v+i*m+h*b+t[12],n[13]=e*v+c*m+s*b+t[13],n[14]=a*v+f*m+M*b+t[14],n[15]=o*v+d*m+l*b+t[15]),n}function y(n,t,r){var u=r[0],e=r[1],a=r[2];return n[0]=t[0]*u,n[1]=t[1]*u,n[2]=t[2]*u,n[3]=t[3]*u,n[4]=t[4]*e,n[5]=t[5]*e,n[6]=t[6]*e,n[7]=t[7]*e,n[8]=t[8]*a,n[9]=t[9]*a,n[10]=t[10]*a,n[11]=t[11]*a,n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n}function q(n,t,r,u){var e,a,o,c,f,d,h,s,M,l,v,m,b,g,p,x,w,y,q,A,P,S,I,E,T=u[0],L=u[1],R=u[2],_=Math.sqrt(T*T+L*L+R*R);return _<i?null:(T*=_=1/_,L*=_,R*=_,e=Math.sin(r),o=1-(a=Math.cos(r)),c=t[0],f=t[1],d=t[2],h=t[3],s=t[4],M=t[5],l=t[6],v=t[7],m=t[8],b=t[9],g=t[10],p=t[11],x=T*T*o+a,w=L*T*o+R*e,y=R*T*o-L*e,q=T*L*o-R*e,A=L*L*o+a,P=R*L*o+T*e,S=T*R*o+L*e,I=L*R*o-T*e,E=R*R*o+a,n[0]=c*x+s*w+m*y,n[1]=f*x+M*w+b*y,n[2]=d*x+l*w+g*y,n[3]=h*x+v*w+p*y,n[4]=c*q+s*A+m*P,n[5]=f*q+M*A+b*P,n[6]=d*q+l*A+g*P,n[7]=h*q+v*A+p*P,n[8]=c*S+s*I+m*E,n[9]=f*S+M*I+b*E,n[10]=d*S+l*I+g*E,n[11]=h*S+v*I+p*E,t!==n&&(n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n)}function A(n,t,r){var u=Math.sin(r),e=Math.cos(r),a=t[4],o=t[5],i=t[6],c=t[7],f=t[8],d=t[9],h=t[10],s=t[11];return t!==n&&(n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n[4]=a*e+f*u,n[5]=o*e+d*u,n[6]=i*e+h*u,n[7]=c*e+s*u,n[8]=f*e-a*u,n[9]=d*e-o*u,n[10]=h*e-i*u,n[11]=s*e-c*u,n}function P(n,t,r){var u=Math.sin(r),e=Math.cos(r),a=t[0],o=t[1],i=t[2],c=t[3],f=t[8],d=t[9],h=t[10],s=t[11];return t!==n&&(n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n[0]=a*e-f*u,n[1]=o*e-d*u,n[2]=i*e-h*u,n[3]=c*e-s*u,n[8]=a*u+f*e,n[9]=o*u+d*e,n[10]=i*u+h*e,n[11]=c*u+s*e,n}function S(n,t,r){var u=Math.sin(r),e=Math.cos(r),a=t[0],o=t[1],i=t[2],c=t[3],f=t[4],d=t[5],h=t[6],s=t[7];return t!==n&&(n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n[0]=a*e+f*u,n[1]=o*e+d*u,n[2]=i*e+h*u,n[3]=c*e+s*u,n[4]=f*e-a*u,n[5]=d*e-o*u,n[6]=h*e-i*u,n[7]=s*e-c*u,n}function I(n,t){return n[0]=1,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=1,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=1,n[11]=0,n[12]=t[0],n[13]=t[1],n[14]=t[2],n[15]=1,n}function E(n,t){return n[0]=t[0],n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=t[1],n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=t[2],n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function T(n,t,r){var u,e,a,o=r[0],c=r[1],f=r[2],d=Math.sqrt(o*o+c*c+f*f);return d<i?null:(o*=d=1/d,c*=d,f*=d,u=Math.sin(t),a=1-(e=Math.cos(t)),n[0]=o*o*a+e,n[1]=c*o*a+f*u,n[2]=f*o*a-c*u,n[3]=0,n[4]=o*c*a-f*u,n[5]=c*c*a+e,n[6]=f*c*a+o*u,n[7]=0,n[8]=o*f*a+c*u,n[9]=c*f*a-o*u,n[10]=f*f*a+e,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n)}function L(n,t){var r=Math.sin(t),u=Math.cos(t);return n[0]=1,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=u,n[6]=r,n[7]=0,n[8]=0,n[9]=-r,n[10]=u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function R(n,t){var r=Math.sin(t),u=Math.cos(t);return n[0]=u,n[1]=0,n[2]=-r,n[3]=0,n[4]=0,n[5]=1,n[6]=0,n[7]=0,n[8]=r,n[9]=0,n[10]=u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function _(n,t){var r=Math.sin(t),u=Math.cos(t);return n[0]=u,n[1]=r,n[2]=0,n[3]=0,n[4]=-r,n[5]=u,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=1,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function F(n,t,r){var u=t[0],e=t[1],a=t[2],o=t[3],i=u+u,c=e+e,f=a+a,d=u*i,h=u*c,s=u*f,M=e*c,l=e*f,v=a*f,m=o*i,b=o*c,g=o*f;return n[0]=1-(M+v),n[1]=h+g,n[2]=s-b,n[3]=0,n[4]=h-g,n[5]=1-(d+v),n[6]=l+m,n[7]=0,n[8]=s+b,n[9]=l-m,n[10]=1-(d+M),n[11]=0,n[12]=r[0],n[13]=r[1],n[14]=r[2],n[15]=1,n}function O(n,t){var r=new c(3),u=-t[0],e=-t[1],a=-t[2],o=t[3],i=t[4],f=t[5],d=t[6],h=t[7],s=u*u+e*e+a*a+o*o;return s>0?(r[0]=2*(i*o+h*u+f*a-d*e)/s,r[1]=2*(f*o+h*e+d*u-i*a)/s,r[2]=2*(d*o+h*a+i*e-f*u)/s):(r[0]=2*(i*o+h*u+f*a-d*e),r[1]=2*(f*o+h*e+d*u-i*a),r[2]=2*(d*o+h*a+i*e-f*u)),F(n,t,r),n}function D(n,t){return n[0]=t[12],n[1]=t[13],n[2]=t[14],n}function V(n,t){var r=t[0],u=t[1],e=t[2],a=t[4],o=t[5],i=t[6],c=t[8],f=t[9],d=t[10];return n[0]=Math.sqrt(r*r+u*u+e*e),n[1]=Math.sqrt(a*a+o*o+i*i),n[2]=Math.sqrt(c*c+f*f+d*d),n}function B(n,t){var r=t[0]+t[5]+t[10],u=0;return r>0?(u=2*Math.sqrt(r+1),n[3]=.25*u,n[0]=(t[6]-t[9])/u,n[1]=(t[8]-t[2])/u,n[2]=(t[1]-t[4])/u):t[0]>t[5]&&t[0]>t[10]?(u=2*Math.sqrt(1+t[0]-t[5]-t[10]),n[3]=(t[6]-t[9])/u,n[0]=.25*u,n[1]=(t[1]+t[4])/u,n[2]=(t[8]+t[2])/u):t[5]>t[10]?(u=2*Math.sqrt(1+t[5]-t[0]-t[10]),n[3]=(t[8]-t[2])/u,n[0]=(t[1]+t[4])/u,n[1]=.25*u,n[2]=(t[6]+t[9])/u):(u=2*Math.sqrt(1+t[10]-t[0]-t[5]),n[3]=(t[1]-t[4])/u,n[0]=(t[8]+t[2])/u,n[1]=(t[6]+t[9])/u,n[2]=.25*u),n}function j(n,t,r,u){var e=t[0],a=t[1],o=t[2],i=t[3],c=e+e,f=a+a,d=o+o,h=e*c,s=e*f,M=e*d,l=a*f,v=a*d,m=o*d,b=i*c,g=i*f,p=i*d,x=u[0],w=u[1],y=u[2];return n[0]=(1-(l+m))*x,n[1]=(s+p)*x,n[2]=(M-g)*x,n[3]=0,n[4]=(s-p)*w,n[5]=(1-(h+m))*w,n[6]=(v+b)*w,n[7]=0,n[8]=(M+g)*y,n[9]=(v-b)*y,n[10]=(1-(h+l))*y,n[11]=0,n[12]=r[0],n[13]=r[1],n[14]=r[2],n[15]=1,n}function C(n,t,r,u,e){var a=t[0],o=t[1],i=t[2],c=t[3],f=a+a,d=o+o,h=i+i,s=a*f,M=a*d,l=a*h,v=o*d,m=o*h,b=i*h,g=c*f,p=c*d,x=c*h,w=u[0],y=u[1],q=u[2],A=e[0],P=e[1],S=e[2],I=(1-(v+b))*w,E=(M+x)*w,T=(l-p)*w,L=(M-x)*y,R=(1-(s+b))*y,_=(m+g)*y,F=(l+p)*q,O=(m-g)*q,D=(1-(s+v))*q;return n[0]=I,n[1]=E,n[2]=T,n[3]=0,n[4]=L,n[5]=R,n[6]=_,n[7]=0,n[8]=F,n[9]=O,n[10]=D,n[11]=0,n[12]=r[0]+A-(I*A+L*P+F*S),n[13]=r[1]+P-(E*A+R*P+O*S),n[14]=r[2]+S-(T*A+_*P+D*S),n[15]=1,n}function k(n,t){var r=t[0],u=t[1],e=t[2],a=t[3],o=r+r,i=u+u,c=e+e,f=r*o,d=u*o,h=u*i,s=e*o,M=e*i,l=e*c,v=a*o,m=a*i,b=a*c;return n[0]=1-h-l,n[1]=d+b,n[2]=s-m,n[3]=0,n[4]=d-b,n[5]=1-f-l,n[6]=M+v,n[7]=0,n[8]=s+m,n[9]=M-v,n[10]=1-f-h,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function U(n,t,r,u,e,a,o){var i=1/(r-t),c=1/(e-u),f=1/(a-o);return n[0]=2*a*i,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=2*a*c,n[6]=0,n[7]=0,n[8]=(r+t)*i,n[9]=(e+u)*c,n[10]=(o+a)*f,n[11]=-1,n[12]=0,n[13]=0,n[14]=o*a*2*f,n[15]=0,n}function z(n,t,r,u,e){var a,o=1/Math.tan(t/2);return n[0]=o/r,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=o,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[11]=-1,n[12]=0,n[13]=0,n[15]=0,null!=e&&e!==1/0?(a=1/(u-e),n[10]=(e+u)*a,n[14]=2*e*u*a):(n[10]=-1,n[14]=-2*u),n}function G(n,t,r,u){var e=Math.tan(t.upDegrees*Math.PI/180),a=Math.tan(t.downDegrees*Math.PI/180),o=Math.tan(t.leftDegrees*Math.PI/180),i=Math.tan(t.rightDegrees*Math.PI/180),c=2/(o+i),f=2/(e+a);return n[0]=c,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=f,n[6]=0,n[7]=0,n[8]=-(o-i)*c*.5,n[9]=(e-a)*f*.5,n[10]=u/(r-u),n[11]=-1,n[12]=0,n[13]=0,n[14]=u*r/(r-u),n[15]=0,n}function W(n,t,r,u,e,a,o){var i=1/(t-r),c=1/(u-e),f=1/(a-o);return n[0]=-2*i,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=-2*c,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=2*f,n[11]=0,n[12]=(t+r)*i,n[13]=(e+u)*c,n[14]=(o+a)*f,n[15]=1,n}function Y(n,t,r,u){var e,a,o,c,f,d,h,s,M,l,m=t[0],b=t[1],g=t[2],p=u[0],x=u[1],w=u[2],y=r[0],q=r[1],A=r[2];return Math.abs(m-y)<i&&Math.abs(b-q)<i&&Math.abs(g-A)<i?v(n):(h=m-y,s=b-q,M=g-A,e=x*(M*=l=1/Math.sqrt(h*h+s*s+M*M))-w*(s*=l),a=w*(h*=l)-p*M,o=p*s-x*h,(l=Math.sqrt(e*e+a*a+o*o))?(e*=l=1/l,a*=l,o*=l):(e=0,a=0,o=0),c=s*o-M*a,f=M*e-h*o,d=h*a-s*e,(l=Math.sqrt(c*c+f*f+d*d))?(c*=l=1/l,f*=l,d*=l):(c=0,f=0,d=0),n[0]=e,n[1]=c,n[2]=h,n[3]=0,n[4]=a,n[5]=f,n[6]=s,n[7]=0,n[8]=o,n[9]=d,n[10]=M,n[11]=0,n[12]=-(e*m+a*b+o*g),n[13]=-(c*m+f*b+d*g),n[14]=-(h*m+s*b+M*g),n[15]=1,n)}function H(n,t,r,u){var e=t[0],a=t[1],o=t[2],i=u[0],c=u[1],f=u[2],d=e-r[0],h=a-r[1],s=o-r[2],M=d*d+h*h+s*s;M>0&&(d*=M=1/Math.sqrt(M),h*=M,s*=M);var l=c*s-f*h,v=f*d-i*s,m=i*h-c*d;return(M=l*l+v*v+m*m)>0&&(l*=M=1/Math.sqrt(M),v*=M,m*=M),n[0]=l,n[1]=v,n[2]=m,n[3]=0,n[4]=h*m-s*v,n[5]=s*l-d*m,n[6]=d*v-h*l,n[7]=0,n[8]=d,n[9]=h,n[10]=s,n[11]=0,n[12]=e,n[13]=a,n[14]=o,n[15]=1,n}function N(n){return"mat4("+n[0]+", "+n[1]+", "+n[2]+", "+n[3]+", "+n[4]+", "+n[5]+", "+n[6]+", "+n[7]+", "+n[8]+", "+n[9]+", "+n[10]+", "+n[11]+", "+n[12]+", "+n[13]+", "+n[14]+", "+n[15]+")"}function Q(n){return Math.sqrt(Math.pow(n[0],2)+Math.pow(n[1],2)+Math.pow(n[2],2)+Math.pow(n[3],2)+Math.pow(n[4],2)+Math.pow(n[5],2)+Math.pow(n[6],2)+Math.pow(n[7],2)+Math.pow(n[8],2)+Math.pow(n[9],2)+Math.pow(n[10],2)+Math.pow(n[11],2)+Math.pow(n[12],2)+Math.pow(n[13],2)+Math.pow(n[14],2)+Math.pow(n[15],2))}function X(n,t,r){return n[0]=t[0]+r[0],n[1]=t[1]+r[1],n[2]=t[2]+r[2],n[3]=t[3]+r[3],n[4]=t[4]+r[4],n[5]=t[5]+r[5],n[6]=t[6]+r[6],n[7]=t[7]+r[7],n[8]=t[8]+r[8],n[9]=t[9]+r[9],n[10]=t[10]+r[10],n[11]=t[11]+r[11],n[12]=t[12]+r[12],n[13]=t[13]+r[13],n[14]=t[14]+r[14],n[15]=t[15]+r[15],n}function Z(n,t,r){return n[0]=t[0]-r[0],n[1]=t[1]-r[1],n[2]=t[2]-r[2],n[3]=t[3]-r[3],n[4]=t[4]-r[4],n[5]=t[5]-r[5],n[6]=t[6]-r[6],n[7]=t[7]-r[7],n[8]=t[8]-r[8],n[9]=t[9]-r[9],n[10]=t[10]-r[10],n[11]=t[11]-r[11],n[12]=t[12]-r[12],n[13]=t[13]-r[13],n[14]=t[14]-r[14],n[15]=t[15]-r[15],n}function K(n,t,r){return n[0]=t[0]*r,n[1]=t[1]*r,n[2]=t[2]*r,n[3]=t[3]*r,n[4]=t[4]*r,n[5]=t[5]*r,n[6]=t[6]*r,n[7]=t[7]*r,n[8]=t[8]*r,n[9]=t[9]*r,n[10]=t[10]*r,n[11]=t[11]*r,n[12]=t[12]*r,n[13]=t[13]*r,n[14]=t[14]*r,n[15]=t[15]*r,n}function J(n,t,r,u){return n[0]=t[0]+r[0]*u,n[1]=t[1]+r[1]*u,n[2]=t[2]+r[2]*u,n[3]=t[3]+r[3]*u,n[4]=t[4]+r[4]*u,n[5]=t[5]+r[5]*u,n[6]=t[6]+r[6]*u,n[7]=t[7]+r[7]*u,n[8]=t[8]+r[8]*u,n[9]=t[9]+r[9]*u,n[10]=t[10]+r[10]*u,n[11]=t[11]+r[11]*u,n[12]=t[12]+r[12]*u,n[13]=t[13]+r[13]*u,n[14]=t[14]+r[14]*u,n[15]=t[15]+r[15]*u,n}function $(n,t){return n[0]===t[0]&&n[1]===t[1]&&n[2]===t[2]&&n[3]===t[3]&&n[4]===t[4]&&n[5]===t[5]&&n[6]===t[6]&&n[7]===t[7]&&n[8]===t[8]&&n[9]===t[9]&&n[10]===t[10]&&n[11]===t[11]&&n[12]===t[12]&&n[13]===t[13]&&n[14]===t[14]&&n[15]===t[15]}function nn(n,t){var r=n[0],u=n[1],e=n[2],a=n[3],o=n[4],c=n[5],f=n[6],d=n[7],h=n[8],s=n[9],M=n[10],l=n[11],v=n[12],m=n[13],b=n[14],g=n[15],p=t[0],x=t[1],w=t[2],y=t[3],q=t[4],A=t[5],P=t[6],S=t[7],I=t[8],E=t[9],T=t[10],L=t[11],R=t[12],_=t[13],F=t[14],O=t[15];return Math.abs(r-p)<=i*Math.max(1,Math.abs(r),Math.abs(p))&&Math.abs(u-x)<=i*Math.max(1,Math.abs(u),Math.abs(x))&&Math.abs(e-w)<=i*Math.max(1,Math.abs(e),Math.abs(w))&&Math.abs(a-y)<=i*Math.max(1,Math.abs(a),Math.abs(y))&&Math.abs(o-q)<=i*Math.max(1,Math.abs(o),Math.abs(q))&&Math.abs(c-A)<=i*Math.max(1,Math.abs(c),Math.abs(A))&&Math.abs(f-P)<=i*Math.max(1,Math.abs(f),Math.abs(P))&&Math.abs(d-S)<=i*Math.max(1,Math.abs(d),Math.abs(S))&&Math.abs(h-I)<=i*Math.max(1,Math.abs(h),Math.abs(I))&&Math.abs(s-E)<=i*Math.max(1,Math.abs(s),Math.abs(E))&&Math.abs(M-T)<=i*Math.max(1,Math.abs(M),Math.abs(T))&&Math.abs(l-L)<=i*Math.max(1,Math.abs(l),Math.abs(L))&&Math.abs(v-R)<=i*Math.max(1,Math.abs(v),Math.abs(R))&&Math.abs(m-_)<=i*Math.max(1,Math.abs(m),Math.abs(_))&&Math.abs(b-F)<=i*Math.max(1,Math.abs(b),Math.abs(F))&&Math.abs(g-O)<=i*Math.max(1,Math.abs(g),Math.abs(O))}var tn=x,rn=Z;function un(){var n=new c(2);return c!=Float32Array&&(n[0]=0,n[1]=0),n}function en(n){var t=new c(2);return t[0]=n[0],t[1]=n[1],t}function an(n,t){var r=new c(2);return r[0]=n,r[1]=t,r}function on(n,t){return n[0]=t[0],n[1]=t[1],n}function cn(n,t,r){return n[0]=t,n[1]=r,n}function fn(n,t,r){return n[0]=t[0]+r[0],n[1]=t[1]+r[1],n}function dn(n,t,r){return n[0]=t[0]-r[0],n[1]=t[1]-r[1],n}function hn(n,t,r){return n[0]=t[0]*r[0],n[1]=t[1]*r[1],n}function sn(n,t,r){return n[0]=t[0]/r[0],n[1]=t[1]/r[1],n}function Mn(n,t){return n[0]=Math.ceil(t[0]),n[1]=Math.ceil(t[1]),n}function ln(n,t){return n[0]=Math.floor(t[0]),n[1]=Math.floor(t[1]),n}function vn(n,t,r){return n[0]=Math.min(t[0],r[0]),n[1]=Math.min(t[1],r[1]),n}function mn(n,t,r){return n[0]=Math.max(t[0],r[0]),n[1]=Math.max(t[1],r[1]),n}function bn(n,t){return n[0]=Math.round(t[0]),n[1]=Math.round(t[1]),n}function gn(n,t,r){return n[0]=t[0]*r,n[1]=t[1]*r,n}function pn(n,t,r,u){return n[0]=t[0]+r[0]*u,n[1]=t[1]+r[1]*u,n}function xn(n,t){var r=t[0]-n[0],u=t[1]-n[1];return Math.sqrt(r*r+u*u)}function wn(n,t){var r=t[0]-n[0],u=t[1]-n[1];return r*r+u*u}function yn(n){var t=n[0],r=n[1];return Math.sqrt(t*t+r*r)}function qn(n){var t=n[0],r=n[1];return t*t+r*r}function An(n,t){return n[0]=-t[0],n[1]=-t[1],n}function Pn(n,t){return n[0]=1/t[0],n[1]=1/t[1],n}function Sn(n,t){var r=t[0],u=t[1],e=r*r+u*u;return e>0&&(e=1/Math.sqrt(e)),n[0]=t[0]*e,n[1]=t[1]*e,n}function In(n,t){return n[0]*t[0]+n[1]*t[1]}function En(n,t,r){var u=t[0]*r[1]-t[1]*r[0];return n[0]=n[1]=0,n[2]=u,n}function Tn(n,t,r,u){var e=t[0],a=t[1];return n[0]=e+u*(r[0]-e),n[1]=a+u*(r[1]-a),n}function Ln(n,t){t=t||1;var r=2*f()*Math.PI;return n[0]=Math.cos(r)*t,n[1]=Math.sin(r)*t,n}function Rn(n,t,r){var u=t[0],e=t[1];return n[0]=r[0]*u+r[2]*e,n[1]=r[1]*u+r[3]*e,n}function _n(n,t,r){var u=t[0],e=t[1];return n[0]=r[0]*u+r[2]*e+r[4],n[1]=r[1]*u+r[3]*e+r[5],n}function Fn(n,t,r){var u=t[0],e=t[1];return n[0]=r[0]*u+r[3]*e+r[6],n[1]=r[1]*u+r[4]*e+r[7],n}function On(n,t,r){var u=t[0],e=t[1];return n[0]=r[0]*u+r[4]*e+r[12],n[1]=r[1]*u+r[5]*e+r[13],n}function Dn(n,t,r,u){var e=t[0]-r[0],a=t[1]-r[1],o=Math.sin(u),i=Math.cos(u);return n[0]=e*i-a*o+r[0],n[1]=e*o+a*i+r[1],n}function Vn(n,t){var r=n[0],u=n[1],e=t[0],a=t[1],o=r*r+u*u;o>0&&(o=1/Math.sqrt(o));var i=e*e+a*a;i>0&&(i=1/Math.sqrt(i));var c=(r*e+u*a)*o*i;return c>1?0:c<-1?Math.PI:Math.acos(c)}function Bn(n){return n[0]=0,n[1]=0,n}function jn(n){return"vec2("+n[0]+", "+n[1]+")"}function Cn(n,t){return n[0]===t[0]&&n[1]===t[1]}function kn(n,t){var r=n[0],u=n[1],e=t[0],a=t[1];return Math.abs(r-e)<=i*Math.max(1,Math.abs(r),Math.abs(e))&&Math.abs(u-a)<=i*Math.max(1,Math.abs(u),Math.abs(a))}var Un,zn=yn,Gn=dn,Wn=hn,Yn=sn,Hn=xn,Nn=wn,Qn=qn,Xn=(Un=un(),function(n,t,r,u,e,a){var o,i;for(t||(t=2),r||(r=0),i=u?Math.min(u*t+r,n.length):n.length,o=r;o<i;o+=t)Un[0]=n[o],Un[1]=n[o+1],e(Un,Un,a),n[o]=Un[0],n[o+1]=Un[1];return n});function Zn(){var n=new c(3);return c!=Float32Array&&(n[0]=0,n[1]=0,n[2]=0),n}function Kn(n){var t=new c(3);return t[0]=n[0],t[1]=n[1],t[2]=n[2],t}function Jn(n){var t=n[0],r=n[1],u=n[2];return Math.sqrt(t*t+r*r+u*u)}function $n(n,t,r){var u=new c(3);return u[0]=n,u[1]=t,u[2]=r,u}function nt(n,t){return n[0]=t[0],n[1]=t[1],n[2]=t[2],n}function tt(n,t,r,u){return n[0]=t,n[1]=r,n[2]=u,n}function rt(n,t,r){return n[0]=t[0]+r[0],n[1]=t[1]+r[1],n[2]=t[2]+r[2],n}function ut(n,t,r){return n[0]=t[0]-r[0],n[1]=t[1]-r[1],n[2]=t[2]-r[2],n}function et(n,t,r){return n[0]=t[0]*r[0],n[1]=t[1]*r[1],n[2]=t[2]*r[2],n}function at(n,t,r){return n[0]=t[0]/r[0],n[1]=t[1]/r[1],n[2]=t[2]/r[2],n}function ot(n,t){return n[0]=Math.ceil(t[0]),n[1]=Math.ceil(t[1]),n[2]=Math.ceil(t[2]),n}function it(n,t){return n[0]=Math.floor(t[0]),n[1]=Math.floor(t[1]),n[2]=Math.floor(t[2]),n}function ct(n,t,r){return n[0]=Math.min(t[0],r[0]),n[1]=Math.min(t[1],r[1]),n[2]=Math.min(t[2],r[2]),n}function ft(n,t,r){return n[0]=Math.max(t[0],r[0]),n[1]=Math.max(t[1],r[1]),n[2]=Math.max(t[2],r[2]),n}function dt(n,t){return n[0]=Math.round(t[0]),n[1]=Math.round(t[1]),n[2]=Math.round(t[2]),n}function ht(n,t,r){return n[0]=t[0]*r,n[1]=t[1]*r,n[2]=t[2]*r,n}function st(n,t,r,u){return n[0]=t[0]+r[0]*u,n[1]=t[1]+r[1]*u,n[2]=t[2]+r[2]*u,n}function Mt(n,t){var r=t[0]-n[0],u=t[1]-n[1],e=t[2]-n[2];return Math.sqrt(r*r+u*u+e*e)}function lt(n,t){var r=t[0]-n[0],u=t[1]-n[1],e=t[2]-n[2];return r*r+u*u+e*e}function vt(n){var t=n[0],r=n[1],u=n[2];return t*t+r*r+u*u}function mt(n,t){return n[0]=-t[0],n[1]=-t[1],n[2]=-t[2],n}function bt(n,t){return n[0]=1/t[0],n[1]=1/t[1],n[2]=1/t[2],n}function gt(n,t){var r=t[0],u=t[1],e=t[2],a=r*r+u*u+e*e;return a>0&&(a=1/Math.sqrt(a)),n[0]=t[0]*a,n[1]=t[1]*a,n[2]=t[2]*a,n}function pt(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function xt(n,t,r){var u=t[0],e=t[1],a=t[2],o=r[0],i=r[1],c=r[2];return n[0]=e*c-a*i,n[1]=a*o-u*c,n[2]=u*i-e*o,n}function wt(n,t,r,u){var e=t[0],a=t[1],o=t[2];return n[0]=e+u*(r[0]-e),n[1]=a+u*(r[1]-a),n[2]=o+u*(r[2]-o),n}function yt(n,t,r,u,e,a){var o=a*a,i=o*(2*a-3)+1,c=o*(a-2)+a,f=o*(a-1),d=o*(3-2*a);return n[0]=t[0]*i+r[0]*c+u[0]*f+e[0]*d,n[1]=t[1]*i+r[1]*c+u[1]*f+e[1]*d,n[2]=t[2]*i+r[2]*c+u[2]*f+e[2]*d,n}function qt(n,t,r,u,e,a){var o=1-a,i=o*o,c=a*a,f=i*o,d=3*a*i,h=3*c*o,s=c*a;return n[0]=t[0]*f+r[0]*d+u[0]*h+e[0]*s,n[1]=t[1]*f+r[1]*d+u[1]*h+e[1]*s,n[2]=t[2]*f+r[2]*d+u[2]*h+e[2]*s,n}function At(n,t){t=t||1;var r=2*f()*Math.PI,u=2*f()-1,e=Math.sqrt(1-u*u)*t;return n[0]=Math.cos(r)*e,n[1]=Math.sin(r)*e,n[2]=u*t,n}function Pt(n,t,r){var u=t[0],e=t[1],a=t[2],o=r[3]*u+r[7]*e+r[11]*a+r[15];return o=o||1,n[0]=(r[0]*u+r[4]*e+r[8]*a+r[12])/o,n[1]=(r[1]*u+r[5]*e+r[9]*a+r[13])/o,n[2]=(r[2]*u+r[6]*e+r[10]*a+r[14])/o,n}function St(n,t,r){var u=t[0],e=t[1],a=t[2];return n[0]=u*r[0]+e*r[3]+a*r[6],n[1]=u*r[1]+e*r[4]+a*r[7],n[2]=u*r[2]+e*r[5]+a*r[8],n}function It(n,t,r){var u=r[0],e=r[1],a=r[2],o=r[3],i=t[0],c=t[1],f=t[2],d=e*f-a*c,h=a*i-u*f,s=u*c-e*i,M=e*s-a*h,l=a*d-u*s,v=u*h-e*d,m=2*o;return d*=m,h*=m,s*=m,M*=2,l*=2,v*=2,n[0]=i+d+M,n[1]=c+h+l,n[2]=f+s+v,n}function Et(n,t,r,u){var e=[],a=[];return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],a[0]=e[0],a[1]=e[1]*Math.cos(u)-e[2]*Math.sin(u),a[2]=e[1]*Math.sin(u)+e[2]*Math.cos(u),n[0]=a[0]+r[0],n[1]=a[1]+r[1],n[2]=a[2]+r[2],n}function Tt(n,t,r,u){var e=[],a=[];return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],a[0]=e[2]*Math.sin(u)+e[0]*Math.cos(u),a[1]=e[1],a[2]=e[2]*Math.cos(u)-e[0]*Math.sin(u),n[0]=a[0]+r[0],n[1]=a[1]+r[1],n[2]=a[2]+r[2],n}function Lt(n,t,r,u){var e=[],a=[];return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],a[0]=e[0]*Math.cos(u)-e[1]*Math.sin(u),a[1]=e[0]*Math.sin(u)+e[1]*Math.cos(u),a[2]=e[2],n[0]=a[0]+r[0],n[1]=a[1]+r[1],n[2]=a[2]+r[2],n}function Rt(n,t){var r=$n(n[0],n[1],n[2]),u=$n(t[0],t[1],t[2]);gt(r,r),gt(u,u);var e=pt(r,u);return e>1?0:e<-1?Math.PI:Math.acos(e)}function _t(n){return n[0]=0,n[1]=0,n[2]=0,n}function Ft(n){return"vec3("+n[0]+", "+n[1]+", "+n[2]+")"}function Ot(n,t){return n[0]===t[0]&&n[1]===t[1]&&n[2]===t[2]}function Dt(n,t){var r=n[0],u=n[1],e=n[2],a=t[0],o=t[1],c=t[2];return Math.abs(r-a)<=i*Math.max(1,Math.abs(r),Math.abs(a))&&Math.abs(u-o)<=i*Math.max(1,Math.abs(u),Math.abs(o))&&Math.abs(e-c)<=i*Math.max(1,Math.abs(e),Math.abs(c))}var Vt=ut,Bt=et,jt=at,Ct=Mt,kt=lt,Ut=Jn,zt=vt,Gt=function(){var n=Zn();return function(t,r,u,e,a,o){var i,c;for(r||(r=3),u||(u=0),c=e?Math.min(e*r+u,t.length):t.length,i=u;i<c;i+=r)n[0]=t[i],n[1]=t[i+1],n[2]=t[i+2],a(n,n,o),t[i]=n[0],t[i+1]=n[1],t[i+2]=n[2];return t}}();function Wt(){var n=new c(4);return c!=Float32Array&&(n[0]=0,n[1]=0,n[2]=0,n[3]=0),n}function Yt(n){var t=new c(4);return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t}function Ht(n,t,r,u){var e=new c(4);return e[0]=n,e[1]=t,e[2]=r,e[3]=u,e}function Nt(n,t){return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n}function Qt(n,t,r,u,e){return n[0]=t,n[1]=r,n[2]=u,n[3]=e,n}function Xt(n,t,r){return n[0]=t[0]+r[0],n[1]=t[1]+r[1],n[2]=t[2]+r[2],n[3]=t[3]+r[3],n}function Zt(n,t,r){return n[0]=t[0]-r[0],n[1]=t[1]-r[1],n[2]=t[2]-r[2],n[3]=t[3]-r[3],n}function Kt(n,t,r){return n[0]=t[0]*r[0],n[1]=t[1]*r[1],n[2]=t[2]*r[2],n[3]=t[3]*r[3],n}function Jt(n,t,r){return n[0]=t[0]/r[0],n[1]=t[1]/r[1],n[2]=t[2]/r[2],n[3]=t[3]/r[3],n}function $t(n,t){return n[0]=Math.ceil(t[0]),n[1]=Math.ceil(t[1]),n[2]=Math.ceil(t[2]),n[3]=Math.ceil(t[3]),n}function nr(n,t){return n[0]=Math.floor(t[0]),n[1]=Math.floor(t[1]),n[2]=Math.floor(t[2]),n[3]=Math.floor(t[3]),n}function tr(n,t,r){return n[0]=Math.min(t[0],r[0]),n[1]=Math.min(t[1],r[1]),n[2]=Math.min(t[2],r[2]),n[3]=Math.min(t[3],r[3]),n}function rr(n,t,r){return n[0]=Math.max(t[0],r[0]),n[1]=Math.max(t[1],r[1]),n[2]=Math.max(t[2],r[2]),n[3]=Math.max(t[3],r[3]),n}function ur(n,t){return n[0]=Math.round(t[0]),n[1]=Math.round(t[1]),n[2]=Math.round(t[2]),n[3]=Math.round(t[3]),n}function er(n,t,r){return n[0]=t[0]*r,n[1]=t[1]*r,n[2]=t[2]*r,n[3]=t[3]*r,n}function ar(n,t,r,u){return n[0]=t[0]+r[0]*u,n[1]=t[1]+r[1]*u,n[2]=t[2]+r[2]*u,n[3]=t[3]+r[3]*u,n}function or(n,t){var r=t[0]-n[0],u=t[1]-n[1],e=t[2]-n[2],a=t[3]-n[3];return Math.sqrt(r*r+u*u+e*e+a*a)}function ir(n,t){var r=t[0]-n[0],u=t[1]-n[1],e=t[2]-n[2],a=t[3]-n[3];return r*r+u*u+e*e+a*a}function cr(n){var t=n[0],r=n[1],u=n[2],e=n[3];return Math.sqrt(t*t+r*r+u*u+e*e)}function fr(n){var t=n[0],r=n[1],u=n[2],e=n[3];return t*t+r*r+u*u+e*e}function dr(n,t){return n[0]=-t[0],n[1]=-t[1],n[2]=-t[2],n[3]=-t[3],n}function hr(n,t){return n[0]=1/t[0],n[1]=1/t[1],n[2]=1/t[2],n[3]=1/t[3],n}function sr(n,t){var r=t[0],u=t[1],e=t[2],a=t[3],o=r*r+u*u+e*e+a*a;return o>0&&(o=1/Math.sqrt(o)),n[0]=r*o,n[1]=u*o,n[2]=e*o,n[3]=a*o,n}function Mr(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]+n[3]*t[3]}function lr(n,t,r,u){var e=r[0]*u[1]-r[1]*u[0],a=r[0]*u[2]-r[2]*u[0],o=r[0]*u[3]-r[3]*u[0],i=r[1]*u[2]-r[2]*u[1],c=r[1]*u[3]-r[3]*u[1],f=r[2]*u[3]-r[3]*u[2],d=t[0],h=t[1],s=t[2],M=t[3];return n[0]=h*f-s*c+M*i,n[1]=-d*f+s*o-M*a,n[2]=d*c-h*o+M*e,n[3]=-d*i+h*a-s*e,n}function vr(n,t,r,u){var e=t[0],a=t[1],o=t[2],i=t[3];return n[0]=e+u*(r[0]-e),n[1]=a+u*(r[1]-a),n[2]=o+u*(r[2]-o),n[3]=i+u*(r[3]-i),n}function mr(n,t){var r,u,e,a,o,i;t=t||1;do{o=(r=2*f()-1)*r+(u=2*f()-1)*u}while(o>=1);do{i=(e=2*f()-1)*e+(a=2*f()-1)*a}while(i>=1);var c=Math.sqrt((1-o)/i);return n[0]=t*r,n[1]=t*u,n[2]=t*e*c,n[3]=t*a*c,n}function br(n,t,r){var u=t[0],e=t[1],a=t[2],o=t[3];return n[0]=r[0]*u+r[4]*e+r[8]*a+r[12]*o,n[1]=r[1]*u+r[5]*e+r[9]*a+r[13]*o,n[2]=r[2]*u+r[6]*e+r[10]*a+r[14]*o,n[3]=r[3]*u+r[7]*e+r[11]*a+r[15]*o,n}function gr(n,t,r){var u=t[0],e=t[1],a=t[2],o=r[0],i=r[1],c=r[2],f=r[3],d=f*u+i*a-c*e,h=f*e+c*u-o*a,s=f*a+o*e-i*u,M=-o*u-i*e-c*a;return n[0]=d*f+M*-o+h*-c-s*-i,n[1]=h*f+M*-i+s*-o-d*-c,n[2]=s*f+M*-c+d*-i-h*-o,n[3]=t[3],n}function pr(n){return n[0]=0,n[1]=0,n[2]=0,n[3]=0,n}function xr(n){return"vec4("+n[0]+", "+n[1]+", "+n[2]+", "+n[3]+")"}function wr(n,t){return n[0]===t[0]&&n[1]===t[1]&&n[2]===t[2]&&n[3]===t[3]}function yr(n,t){var r=n[0],u=n[1],e=n[2],a=n[3],o=t[0],c=t[1],f=t[2],d=t[3];return Math.abs(r-o)<=i*Math.max(1,Math.abs(r),Math.abs(o))&&Math.abs(u-c)<=i*Math.max(1,Math.abs(u),Math.abs(c))&&Math.abs(e-f)<=i*Math.max(1,Math.abs(e),Math.abs(f))&&Math.abs(a-d)<=i*Math.max(1,Math.abs(a),Math.abs(d))}var qr=Zt,Ar=Kt,Pr=Jt,Sr=or,Ir=ir,Er=cr,Tr=fr,Lr=function(){var n=Wt();return function(t,r,u,e,a,o){var i,c;for(r||(r=4),u||(u=0),c=e?Math.min(e*r+u,t.length):t.length,i=u;i<c;i+=r)n[0]=t[i],n[1]=t[i+1],n[2]=t[i+2],n[3]=t[i+3],a(n,n,o),t[i]=n[0],t[i+1]=n[1],t[i+2]=n[2],t[i+3]=n[3];return t}}();r.d(t,"a",function(){return u}),r.d(t,"b",function(){return e}),r.d(t,"c",function(){return a}),r.d(t,"d",function(){return o})},1:function(n,t,r){"use strict";r.d(t,"d",function(){return o}),r.d(t,"a",function(){return i}),r.d(t,"c",function(){return c}),r.d(t,"b",function(){return d});var u=r(0);var e='This page requires a browser that supports WebGL.<br/>\n<a href="http://get.webgl.org">Click here to upgrade your browser.</a>',a='It doesn\'t appear your computer can support WebGL.<br/>\n<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';function o(n,t){function r(t){var r=n.parentNode;r&&(r.innerHTML='<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>\n    <td align="center">\n    <div style="display: table-cell; vertical-align: middle;">\n    <div>'.concat(t,"</div>\n    </div>\n    </td></tr></table>"))}if(!window.WebGLRenderingContext)return r(e),null;var u=function(n,t){for(var r=["webgl","experimental-webgl","webkit-3d","moz-webgl"],u=null,e=0;e<r.length;++e){try{u=n.getContext(r[e],t)}catch(n){}if(u)break}return u}(n,t);return u||r(a),u}function i(n,t,r){var u=n.createShader(n.VERTEX_SHADER);if(n.shaderSource(u,t),n.compileShader(u),!n.getShaderParameter(u,n.COMPILE_STATUS)){var e="Vertex shader failed to compile.  The error log is:".concat(n.getShaderInfoLog(u));return console.error(e),-1}var a=n.createShader(n.FRAGMENT_SHADER);if(n.shaderSource(a,r),n.compileShader(a),!n.getShaderParameter(a,n.COMPILE_STATUS)){var o="Fragment shader failed to compile.  The error log is:".concat(n.getShaderInfoLog(a));return console.error(o),-1}var i=n.createProgram();if(n.attachShader(i,u),n.attachShader(i,a),n.linkProgram(i),!n.getProgramParameter(i,n.LINK_STATUS)){var c="Shader program failed to link.  The error log is:".concat(n.getProgramInfoLog(i));return console.error(c),-1}return i}function c(n){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Float32Array,r=n[0].length,u=n.length,e=new t(r*u),a=0,o=0;o<u;o++)for(var i=0;i<r;i++)e[a++]=n[o][i];return e}var f={fv3:{},fv4:{},uv3:{},uv4:{}};function d(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"fv4";if(f[t][n])return f[t][n];var r,e=parseInt(n.charAt(1)+n.charAt(2),16),a=parseInt(n.charAt(3)+n.charAt(4),16),o=parseInt(n.charAt(5)+n.charAt(6),16);return r="fv3"===t?u.c.fromValues(e/255,a/255,o/255):"fv4"===t?u.d.fromValues(e/255,a/255,o/255,1):"uv3"===t?new Uint8Array([e,a,o]):new Uint8Array([e,a,o,255]),f[t][n]=r,f[t][n]}},57:function(n,t){n.exports="attribute vec4 vPosition;\nuniform float theta;\nvoid main() {\n\tgl_Position.x = (-sin(theta) * vPosition.x) + (cos(theta) * vPosition.y);\n\tgl_Position.y = (sin(theta) * vPosition.y) + (cos(theta) * vPosition.x);\n\tgl_Position.z = 0.0;\n\tgl_Position.w = 1.0;\n}\n"},58:function(n,t){n.exports="precision mediump float;\nvoid main() {\n\tgl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);\n}\n"},85:function(n,t,r){"use strict";r.r(t);var u,e,a=r(1),o=r(0),i=r(57),c=r.n(i),f=r(58),d=r.n(f);var h=document.getElementById("speedRange"),s=document.getElementById("direction"),M=parseInt(h.value,10),l=0,v=parseInt(s.value,10);function m(){u.clear(u.COLOR_BUFFER_BIT),u.uniform1f(e,l),u.drawArrays(u.TRIANGLE_STRIP,0,4),l+=.002*v*M,requestAnimationFrame(m)}var b=document.getElementById("speedUp"),g=document.getElementById("slowDown"),p=document.getElementById("speed");function x(n){w(Math.max(0,Math.min(M+n,100)))}function w(n){M=parseInt(n,10),h.value=n,p.innerHTML=n}b.addEventListener("click",function(){return x(1)}),g.addEventListener("click",function(){return x(-1)}),h.addEventListener("change",function(){w(h.value)}),s.addEventListener("change",function(){v=parseInt(s.value,10)}),function(){var n=document.getElementById("gl-canvas");(u=Object(a.d)(n))||console.error("WebGL isn't available");var t=[o.b.fromValues(0,.5),o.b.fromValues(.5,0),o.b.fromValues(-.5,0),o.b.fromValues(0,-.5)];u.viewport(0,0,n.width,n.height),u.clearColor(1,1,1,1);var r=Object(a.a)(u,c.a,d.a);u.useProgram(r);var i=u.createBuffer();u.bindBuffer(u.ARRAY_BUFFER,i),u.bufferData(u.ARRAY_BUFFER,Object(a.c)(t),u.STATIC_DRAW);var f=u.getAttribLocation(r,"vPosition");u.vertexAttribPointer(f,2,u.FLOAT,!1,0,0),u.enableVertexAttribArray(f),e=u.getUniformLocation(r,"theta"),m()}()}});