import { CardRound } from "../../general/CardRound";
import { InputText } from "../../general/InputText";
import { Button } from "../../general/Button";
import { InputPassword } from "../../general/InputPassword";
import { InputDate } from "../../general/InputDate";

export const Login = () => {
    return (
        <CardRound>
            <form className="flex flex-col text-center">
                <h1 className={"font-bold"}>Bem-vindo(a) ao Cartório</h1>

                <h2 className={"font-light pb-5"}>Acessar o Sistema</h2>

                <div className={"space-y-3 mb-3"}>
                    <InputText
                        placeHolder={"example@mail.com"}
                        labelText={"Digite seu E-mail"}
                    />

                    <InputPassword
                        placeHolder={"4 a 254 caracteres"}
                        labelText={"Digite sua Senha"}
                    />

                    <InputDate labelText={"Data de Nascimento"} />
                </div>

                <p
                    className={
                        "font-light text-[12px] text-slate-500 hover:font-bold hover:text-blue-500 mb-3 cursor-pointer"
                    }
                >
                    Não tem uma conta? Crie uma aqui!
                </p>

                <Button
                    type={"submit"}
                    labelButton={"Entrar"}
                    color={"primary"}
                />
            </form>
        </CardRound>
    );
};
