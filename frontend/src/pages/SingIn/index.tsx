import {CardRound} from "../../components/general/CardRound";
import {InputText} from "../../components/general/InputText";
import {InputPassword} from "../../components/general/InputPassword";
import {Button} from "../../components/general/Button";
import {RouterLink} from "../../components/general/LinkRoute";

export const SingIn = () => {
    return (
        <div
            className={
                "flex flex-center justify-center h-screen py-10 bg-white"
            }
        >
            <CardRound>
                <form className="flex flex-col text-center">
                    <h1 className={"font-bold text-2xl"}>Acessar o Sistema</h1>

                    <h2 className={"font-light pb-5"}>Bem-vindo(a) ao Cartório</h2>

                    <div className={"space-y-3 mb-3"}>
                        <InputText
                            placeHolder={"example@mail.com"}
                            labelText={"Digite seu E-mail"}
                        />

                        <InputPassword
                            placeHolder={"4 a 254 caracteres"}
                            labelText={"Digite sua Senha"}
                        />
                    </div>

                    <RouterLink href={"/sing-up"} className={"cursor-pointer"}>
                        <p
                            className={
                                "font-light text-[12px] text-slate-500 hover:font-bold hover:text-blue-500 mb-3"
                            }
                        >
                            Não tem uma conta? Crie uma aqui!
                        </p>
                    </RouterLink>

                    <Button
                        type={"submit"}
                        labelButton={"Entrar"}
                        color={"primary"}
                    />
                </form>
            </CardRound>
        </div>
    );
};
